"use client";

import { useMapContext } from "@/contexts/context-map";
import { useSamplingContext } from "@/contexts/context-sampling";
import { useRouteSampling } from "@/hooks/useRouteSampling";
import { useRouteTimeSampling } from "@/hooks/useRouteTimeSampling";
import useGetWeather from "@/queries/useWeather";
import { CleanWeatherData } from "@/services/getWeather";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useMemo, useState } from "react";
import { WeatherMarker } from "../weatherMarker";
import { WeatherPopup } from "../weatherPopup";

export type WeatherWithType = CleanWeatherData & {
  type: "origin" | "destination" | "middle";
};

export const GoogleWeatherOnRoute = ({
  encodedPath,
}: {
  encodedPath: string;
}) => {
  const { routeTotalDuration, setDataWeather } = useMapContext();
  const { selectedSampling } = useSamplingContext();

  const map = useMap();
  const geometry = useMapsLibrary("geometry");

  const [selectedWeather, setSelectedWeather] =
    useState<WeatherWithType | null>(null);

  const sampledByDistance = useRouteSampling(encodedPath, geometry);
  const sampledByTime = useRouteTimeSampling(
    encodedPath,
    geometry,
    routeTotalDuration
  );

  const sampledPoints =
    selectedSampling === "distance" ? sampledByDistance : sampledByTime;

  const { data: markers } = useGetWeather(sampledPoints);

  const markersWithType = useMemo<WeatherWithType[]>(() => {
    if (!markers?.length) return [];

    return markers.map((m, i) => ({
      ...m,
      type:
        i === 0
          ? "origin"
          : i === markers.length - 1
          ? "destination"
          : "middle",
    }));
  }, [markers]);

  useEffect(() => {
    if (!map) return;
    const listener = map.addListener("click", () => {
      setSelectedWeather(null);
    });
    return () => google.maps.event.removeListener(listener);
  }, [map]);

  useEffect(() => {
    if (markers?.length) {
      setDataWeather(markers);
    }
  }, [markers, setDataWeather]);

  return (
    <>
      {markersWithType.map((m) => (
        <WeatherMarker
          key={`${m.lat}-${m.lng}`}
          weather={m}
          onSelect={(w) =>
            setSelectedWeather(selectedWeather?.lat === w.lat ? null : w)
          }
        />
      ))}

      <WeatherPopup
        weather={selectedWeather}
        onClose={() => setSelectedWeather(null)}
      />
    </>
  );
};

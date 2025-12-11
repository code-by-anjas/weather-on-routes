"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";

interface MapContextType {
  origin: google.maps.LatLngLiteral | null;
  setOrigin: (origin: google.maps.LatLngLiteral | null) => void;
  destination: google.maps.LatLngLiteral | null;
  setDestination: (destination: google.maps.LatLngLiteral | null) => void;
  center: google.maps.LatLngLiteral;
  setCenter: (center: google.maps.LatLngLiteral) => void;
  encodedPolyline: string | null;
  setEncodedPolyline: (encodedPolyline: string | null) => void;
  routeTotalDuration: number;
  setRouteTotalDuration: (duration: number) => void;
  routeDistanceMeters: number;
  setRouteDistanceMeters: (distance: number) => void;
  dataWeather: CleanWeatherData[] | null;
  setDataWeather: (data: CleanWeatherData[] | null) => void;
}

const MapContext = createContext<MapContextType | null>(null);

export const MapContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: -6.2565,
    lng: 106.8144,
  });

  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [encodedPolyline, setEncodedPolyline] = useState<string | null>(null);
  const [routeTotalDuration, setRouteTotalDuration] = useState<number>(0);
  const [dataWeather, setDataWeather] = useState<CleanWeatherData[] | null>(
    null
  );
  const [routeDistanceMeters, setRouteDistanceMeters] = useState<number>(0);

  return (
    <MapContext.Provider
      value={{
        origin,
        setOrigin,
        destination,
        setDestination,
        center,
        setCenter,
        encodedPolyline,
        setEncodedPolyline,
        routeTotalDuration,
        setRouteTotalDuration,
        routeDistanceMeters,
        setRouteDistanceMeters,
        dataWeather,
        setDataWeather,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const ctx = useContext(MapContext);
  if (!ctx) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }
  return ctx;
};

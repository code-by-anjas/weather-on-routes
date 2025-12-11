"use client";

import { useMapContext } from "@/contexts/context-map";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { WeatherItemCard } from "../weatherItemCard";

const LayerInformation = () => {
  const { dataWeather, routeTotalDuration, routeDistanceMeters } =
    useMapContext();

  // Format waktu (detik → jam & menit)
  const formattedDuration = useMemo(() => {
    if (!routeTotalDuration) return null;

    const totalSeconds = routeTotalDuration;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }, [routeTotalDuration]);

  // Format jarak (meter → km)
  const formattedDistance = useMemo(() => {
    if (!routeDistanceMeters) return null;
    return `${(routeDistanceMeters / 1000).toFixed(1)} km`;
  }, [routeDistanceMeters]);

  // Summary mayoritas cuaca
  const weatherSummary = useMemo(() => {
    if (!dataWeather || dataWeather.length === 0) return null;

    const count: Record<string, number> = {};

    dataWeather.forEach((w) => {
      const key = w.condition.toLowerCase();
      count[key] = (count[key] || 0) + 1;
    });

    const majority = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];

    // Ambil icon dari item pertama yg cocok
    const icon =
      dataWeather.find((w) => w.condition.toLowerCase() === majority)?.icon ||
      "🌤️";

    return {
      condition: majority,
      icon,
    };
  }, [dataWeather]);

  if (!dataWeather || dataWeather.length === 0) return null;

  return (
    <Card className='absolute z-50 bg-white top-4 left-2 w-80 max-h-[80vh] overflow-hidden border shadow-md rounded-xl'>
      <CardHeader className='pb-3'>
        <CardTitle>Weather Information</CardTitle>
        <CardDescription>Weather conditions along your route</CardDescription>

        {/* 🟦 Trip Summary */}
        <div className='mt-3 p-3 bg-gray-100 rounded-lg text-sm'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Estimated Time:</span>
            <span className='font-medium'>{formattedDuration || "-"}</span>
          </div>

          <div className='flex justify-between mt-1'>
            <span className='text-gray-600'>Total Distance:</span>
            <span className='font-medium'>{formattedDistance || "-"}</span>
          </div>
        </div>
      </CardHeader>

      {/* 🟦 List Weather */}
      <CardContent className='space-y-3 overflow-y-auto max-h-[50vh]'>
        {dataWeather?.length === 0 ? (
          <p className='text-sm text-gray-500 italic'>
            No weather data available
          </p>
        ) : (
          dataWeather?.map((item, idx) => (
            <WeatherItemCard key={idx} item={item} />
          ))
        )}
      </CardContent>
      <CardFooter>
        {weatherSummary && (
          <div className='px-4 py-3 border-t bg-gray-50'>
            <p className='text-base text-gray-600 font-semibold'>Summary</p>

            <div className='flex items-center text-sm gap-2 mt-1'>
              <span className='text-gray-800 text-sm'>
                Majority of your route will experience{" "}
                <span className='font-medium'>{weatherSummary.condition}</span>{" "}
                conditions.
              </span>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default LayerInformation;

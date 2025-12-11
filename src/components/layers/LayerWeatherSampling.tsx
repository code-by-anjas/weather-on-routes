"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useMapContext } from "@/contexts/context-map";
import { useSamplingContext } from "@/contexts/context-sampling";
import { cn } from "@/lib/utils";

const LayerWeatherSampling = () => {
  const { dataWeather } = useMapContext();
  const {
    selectedSampling,
    setSelectedSampling,
    distance,
    setDistance,
    time,
    setTime,
  } = useSamplingContext();

  if (!dataWeather || dataWeather.length === 0) return null;

  return (
    <Card className='shadow-sm border rounded-xl w-full max-w-80 absolute right-2 top-2 z-50'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-base font-semibold'>
          Sampling Settings
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-5'>
        {/* Radio Mode */}
        <div className='space-y-2'>
          <Label className='text-sm font-medium'>Sampling Mode</Label>

          <RadioGroup
            value={selectedSampling}
            onValueChange={(v) => setSelectedSampling(v as "distance" | "time")}
            className='flex gap-6 pt-1'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='distance' id='distance' />
              <Label htmlFor='distance'>By Distance</Label>
            </div>

            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='time' id='time' />
              <Label htmlFor='time'>By Time</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Slider Distance */}
        <div
          className={cn(
            "space-y-3 transition-opacity",
            selectedSampling === "distance"
              ? "opacity-100"
              : "opacity-40 pointer-events-none"
          )}
        >
          <Label className='text-sm font-medium'>
            Distance Interval: {distance / 1000} km
          </Label>

          <Slider
            min={500}
            max={30000}
            step={500}
            value={[distance]} // 👈 SLIDER EXPECTS ARRAY
            onValueChange={(v) => setDistance(v[0])}
          />
        </div>

        {/* Slider Time */}
        <div
          className={cn(
            "space-y-3 transition-opacity",
            selectedSampling === "time"
              ? "opacity-100"
              : "opacity-40 pointer-events-none"
          )}
        >
          <Label className='text-sm font-medium'>
            Time Interval: {Math.round(time / 60)} minutes
          </Label>

          <Slider
            min={300}
            max={7200}
            step={300}
            value={[time]} // 👈 must wrap in array
            onValueChange={(v) => setTime(v[0])}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LayerWeatherSampling;

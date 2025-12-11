import { cn } from "@/lib/utils";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

export const WeatherMarker = ({
  weather,
  onSelect,
}: {
  weather: WeatherWithType;
  onSelect: (w: WeatherWithType) => void;
}) => {
  return (
    <AdvancedMarker
      position={{ lat: weather.lat, lng: weather.lng }}
      zIndex={20}
      onClick={(e) => {
        e.domEvent.stopPropagation();
        onSelect(weather);
      }}
    >
      <div className='group relative flex items-center justify-center cursor-pointer'>
        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 shadow-md border backdrop-blur-md transition",
            weather.type === "origin" &&
              "bg-blue-600 text-white border-blue-700",
            weather.type === "destination" &&
              "bg-emerald-600 text-white border-emerald-700",
            weather.type === "middle" &&
              "bg-white text-slate-800 border-slate-200"
          )}
        >
          <span className='text-sm'>{weather.icon}</span>
          <span className='text-xs font-semibold'>{weather.temp}°</span>
        </div>

        <div
          className={cn(
            "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b",
            weather.type === "origin" && "bg-blue-600 border-blue-700",
            weather.type === "destination" &&
              "bg-emerald-600 border-emerald-700",
            weather.type === "middle" && "bg-white border-slate-200"
          )}
        />
      </div>
    </AdvancedMarker>
  );
};

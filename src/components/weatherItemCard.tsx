import { Card, CardContent } from "./ui/card";

export const WeatherItemCard = ({ item }: { item: CleanWeatherData }) => {
  return (
    <Card className='w-full shadow-sm border rounded-xl p-0'>
      <CardContent className='p-3 flex items-center gap-2'>
        {/* Icon Cuaca */}
        <div className='text-5xl'>{item.icon}</div>

        {/* Weather Info */}
        <div className='flex flex-col'>
          <p className='text-sm font-medium capitalize'>{item.condition}</p>
          <p className='text-lg font-semibold'>{item.temp}°C</p>

          <div className='text-xs text-muted-foreground'>
            {item.humidity && <span>Humidity: {item.humidity}% • </span>}
            {item.windSpeed && <span>Wind: {item.windSpeed} km/h</span>}
          </div>

          <p className='text-[10px] text-gray-500 mt-1'>
            lat: {item.lat.toFixed(4)} | lng: {item.lng.toFixed(4)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

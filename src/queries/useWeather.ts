import getWeatherBatch from "@/services/getWeather";
import { useQuery } from "@tanstack/react-query";

interface LatLng {
  lat: number;
  lng: number;
}

const useGetWeather = (points: LatLng[]) => {
  // Query hanya jalan kalau ada minimal 1 titik
  const isReady = points && points.length > 0;

  return useQuery({
    // Query Key pakai points.
    // Tanstack query akan otomatis refetch kalau array points berubah (misal rute berubah).
    queryKey: ["google-weather-batch", points],

    enabled: isReady,
    staleTime: 1000 * 60 * 15, // Cache selama 15 menit (Cuaca gak berubah tiap detik)

    queryFn: () => getWeatherBatch(points),
  });
};

export default useGetWeather;

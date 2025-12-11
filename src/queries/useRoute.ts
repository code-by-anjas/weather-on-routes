import getRoutes from "@/services/getRoutes";
import { useQuery } from "@tanstack/react-query";

interface LatLng {
  lat: number;
  lng: number;
}

interface Props {
  origin: LatLng | null;
  destination: LatLng | null;
}

const isValidLatLng = (coord: LatLng | null) =>
  coord != null && coord.lat != null && coord.lng != null;

const useGetRoutes = ({ origin, destination }: Props) => {
  const isReady = isValidLatLng(origin) && isValidLatLng(destination);

  return useQuery({
    queryKey: ["google-routes", origin, destination],
    enabled: isReady,

    queryFn: () =>
      getRoutes({
        origin: {
          lat: origin!.lat,
          lng: origin!.lng,
        },
        destination: {
          lat: destination!.lat,
          lng: destination!.lng,
        },
      }),
  });
};

export default useGetRoutes;

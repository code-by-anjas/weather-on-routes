"use client";

import { useMapContext } from "@/contexts/context-map";
import useGetRoutes from "@/queries/useRoute";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

export const GoogleRoutes = () => {
  const {
    origin,
    destination,
    setEncodedPolyline,
    setRouteTotalDuration,
    setRouteDistanceMeters,
  } = useMapContext();

  const map = useMap();
  const geometry = useMapsLibrary("geometry");

  const polylineRef = useRef<google.maps.Polyline | null>(null);

  const { data, isLoading, error } = useGetRoutes({
    origin,
    destination,
  });

  useEffect(() => {
    // Pastikan data rute valid
    if (!map || !geometry || !data?.routes?.[0]?.polyline?.encodedPolyline)
      return;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    const encoded = data.routes[0].polyline.encodedPolyline;
    const path = geometry.encoding.decodePath(encoded);
    setEncodedPolyline(encoded);
    setRouteTotalDuration(Number(data.routes[0].duration.replace("s", "")));
    setRouteDistanceMeters(data.routes[0].distanceMeters);

    const polyline = new google.maps.Polyline({
      path, // Google Maps butuh Array Path
      strokeColor: "#4285F4",
      strokeOpacity: 1,
      strokeWeight: 6,
      zIndex: 10,
      map,
    });

    polylineRef.current = polyline;

    // auto fit bounds
    const bounds = new google.maps.LatLngBounds();
    path.forEach((p) => bounds.extend(p));
    map.fitBounds(bounds);

    return () => {
      // Cleanup: Hapus context saat unmount (opsional, biar bersih)
      setEncodedPolyline(null);
      polyline.setMap(null);
    };
  }, [
    map,
    geometry,
    data,
    setEncodedPolyline,
    setRouteTotalDuration,
    setRouteDistanceMeters,
  ]); // Tambahkan setEncodedPolyline ke deps

  if (isLoading) console.log("Loading route...");
  if (error) console.error("Route error:", error);

  return null;
};

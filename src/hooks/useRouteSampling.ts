import { useSamplingContext } from "@/contexts/context-sampling";
import { useMemo } from "react";

export const useRouteSampling = (
  encodedPath: string,
  geometry: google.maps.GeometryLibrary | null
) => {
  const { distance } = useSamplingContext();
  // distance = interval sampling, contoh 3000 ms --> 3 km

  return useMemo(() => {
    if (!geometry || !encodedPath) return [];

    const path = geometry.encoding.decodePath(encodedPath);
    const results: { lat: number; lng: number }[] = [];

    if (path.length === 0) return results;

    // Interval = dari context user (default misalnya 3000 ms, user bisa ubah)
    const samplingInterval = Math.max(distance, 1000);
    // guardrail minimum 1 km biar ga terlalu rapat

    let distAcc = 0;

    // push start point
    results.push({
      lat: path[0].lat(),
      lng: path[0].lng(),
    });

    for (let i = 1; i < path.length; i++) {
      const d = geometry.spherical.computeDistanceBetween(path[i - 1], path[i]);
      distAcc += d;

      if (distAcc >= samplingInterval) {
        results.push({
          lat: path[i].lat(),
          lng: path[i].lng(),
        });
        distAcc = 0;
      }
    }

    // Handling last point (biar pasti masuk)
    const lastPoint = path[path.length - 1];
    const lastSampled = results[results.length - 1];

    const distToEnd = geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(lastSampled.lat, lastSampled.lng),
      lastPoint
    );

    // > 1 km baru ditambah
    if (distToEnd > 1000) {
      results.push({
        lat: lastPoint.lat(),
        lng: lastPoint.lng(),
      });
    } else {
      // kalau sudah dekat, replace last sampled dengan finish point
      results[results.length - 1] = {
        lat: lastPoint.lat(),
        lng: lastPoint.lng(),
      };
    }

    return results;
  }, [encodedPath, geometry, distance]); // <-- tambahin distance
};

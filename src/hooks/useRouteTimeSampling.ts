import { useSamplingContext } from "@/contexts/context-sampling";
import { useMemo } from "react";

type LatLng = { lat: number; lng: number };

export const useRouteTimeSampling = (
  encodedPath: string,
  geometry: google.maps.GeometryLibrary | null,
  totalDurationSeconds: number
) => {
  const { time } = useSamplingContext();

  // Default interval = 1800s (30 menit)
  const intervalSeconds = time > 0 ? time : 1800;

  // maxPoints pakai time sebagai multiplier supaya konsisten
  const maxPoints = 100;

  return useMemo<LatLng[]>(() => {
    if (
      !geometry ||
      !encodedPath ||
      !Number.isFinite(totalDurationSeconds) ||
      totalDurationSeconds <= 0
    ) {
      return [];
    }

    const path = geometry.encoding.decodePath(encodedPath);
    if (path.length === 0) return [];

    const results: LatLng[] = [];

    // 1. Total jarak
    const totalDistanceMeters = geometry.spherical.computeLength(path);

    // 2. Kecepatan rata-rata
    const avgSpeed = totalDistanceMeters / totalDurationSeconds;

    // 3. Interval jarak berbasis waktu
    let targetInterval = avgSpeed * intervalSeconds;

    // 4. Guardrail maxPoints
    targetInterval = Math.max(
      targetInterval,
      totalDistanceMeters / (maxPoints - 1)
    );

    let distAcc = 0;

    // Origin
    results.push({
      lat: path[0].lat(),
      lng: path[0].lng(),
    });

    for (let i = 1; i < path.length && results.length < maxPoints - 1; i++) {
      const segmentDist = geometry.spherical.computeDistanceBetween(
        path[i - 1],
        path[i]
      );

      distAcc += segmentDist;

      while (distAcc >= targetInterval && results.length < maxPoints - 1) {
        results.push({
          lat: path[i].lat(),
          lng: path[i].lng(),
        });
        distAcc -= targetInterval;
      }
    }

    // Destination
    const last = path[path.length - 1];
    results.push({
      lat: last.lat(),
      lng: last.lng(),
    });

    return results;
  }, [encodedPath, geometry, totalDurationSeconds, intervalSeconds, maxPoints]);
};

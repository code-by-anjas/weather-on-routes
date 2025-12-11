"use client";

import { useMapContext } from "@/contexts/context-map";
import { MapMouseEvent } from "@vis.gl/react-google-maps";
import { useCallback } from "react";

export const useMapClick = () => {
  const { origin, setOrigin, destination, setDestination } = useMapContext();

  const onMapClick = useCallback(
    (e: MapMouseEvent) => {
      console.log("map clicked", e);

      const point = {
        lat: e.detail.latLng?.lat ?? 0,
        lng: e.detail.latLng?.lng ?? 0,
      };

      if (!origin) {
        setOrigin(point);
        setDestination(null);
      } else if (!destination) {
        setDestination(point);
      } else {
        setOrigin(point);
        setDestination(null);
      }
    },
    [origin, setOrigin, destination, setDestination]
  );

  return onMapClick;
};

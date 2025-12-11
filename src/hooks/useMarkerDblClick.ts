"use client";

import { useMapContext } from "@/contexts/context-map";
import { useCallback } from "react";

interface Parameters {
  type: "ORIGIN" | "DESTINATION";
}

export const useMarkerDblClick = ({ type }: Parameters) => {
  const { setOrigin, setDestination } = useMapContext();

  const onMarkerDblClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      console.log(e);

      if (type === "ORIGIN") setOrigin(null);
      if (type === "DESTINATION") setDestination(null);
    },
    [type, setOrigin, setDestination]
  );

  return onMarkerDblClick;
};

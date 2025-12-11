"use client";

import { useMapContext } from "@/contexts/context-map";
import { useMapClick } from "@/hooks/useMapClick";
import { useMarkerDblClick } from "@/hooks/useMarkerDblClick";
import { configs } from "@/lib/config";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { GoogleRoutes } from "./routes";
import { GoogleWeatherOnRoute } from "./weatherOnRoute";

const GoogleMaps = () => {
  const { center, origin, destination, encodedPolyline } = useMapContext();

  // hooks
  const handleMapClick = useMapClick();
  const handleDoubleClickOrigin = useMarkerDblClick({ type: "ORIGIN" });
  const handleDoubleClickDestination = useMarkerDblClick({
    type: "DESTINATION",
  });

  return (
    <Map
      mapId={configs.google.mapId}
      style={{ width: "100vw", height: "100vh" }}
      defaultCenter={center}
      gestureHandling='greedy'
      defaultZoom={12}
      disableDefaultUI
      onClick={handleMapClick}
    >
      {!encodedPolyline && (
        <AdvancedMarker
          position={origin}
          zIndex={10000}
          onClick={handleDoubleClickOrigin}
        />
      )}

      {!encodedPolyline && (
        <AdvancedMarker
          position={destination}
          zIndex={10000}
          onClick={handleDoubleClickDestination}
        />
      )}

      {encodedPolyline && (
        <GoogleWeatherOnRoute encodedPath={encodedPolyline} />
      )}
      <GoogleRoutes />
    </Map>
  );
};

export default GoogleMaps;

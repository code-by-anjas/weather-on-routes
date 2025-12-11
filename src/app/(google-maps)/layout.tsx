"use client";

import { MapContextProvider } from "@/contexts/context-map";
import { SamplingContextProvider } from "@/contexts/context-sampling";
import { QueryProvider } from "@/lib/query-provider";
import { APIProvider } from "@vis.gl/react-google-maps";
import { configs } from "../../lib/config";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <APIProvider apiKey={configs.google.apiKey}>
        <MapContextProvider>
          <SamplingContextProvider>{children}</SamplingContextProvider>
        </MapContextProvider>
      </APIProvider>
    </QueryProvider>
  );
}

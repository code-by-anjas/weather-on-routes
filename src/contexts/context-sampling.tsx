import { createContext, FC, ReactNode, useContext, useState } from "react";

interface SamplingContextType {
  selectedSampling: "distance" | "time";
  setSelectedSampling: (sampling: "distance" | "time") => void;
  distance: number;
  setDistance: (distance: number) => void;
  time: number;
  setTime: (time: number) => void;
}

const SamplingContext = createContext<SamplingContextType | null>(null);

export const SamplingContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedSampling, setSelectedSampling] = useState<"distance" | "time">(
    "distance"
  );
  const [distance, setDistance] = useState<number>(10000);
  const [time, setTime] = useState<number>(3600);

  return (
    <SamplingContext.Provider
      value={{
        selectedSampling,
        setSelectedSampling,
        distance,
        setDistance,
        time,
        setTime,
      }}
    >
      {children}
    </SamplingContext.Provider>
  );
};

export const useSamplingContext = () => {
  const ctx = useContext(SamplingContext);
  if (!ctx) {
    throw new Error(
      "useSamplingContext must be used within a SamplingContextProvider"
    );
  }
  return ctx;
};

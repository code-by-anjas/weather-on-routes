import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { AnimatePresence, motion } from "framer-motion";

export const WeatherPopup = ({
  weather,
  onClose,
}: {
  weather: WeatherWithType | null;
  onClose: () => void;
}) => {
  if (!weather) return null;

  return (
    <AnimatePresence>
      {weather && (
        <AdvancedMarker
          position={{
            lat: weather.lat,
            lng: weather.lng,
          }}
          zIndex={100000}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className='relative -translate-y-12'
          >
            <Card
              className={cn(
                "w-64 rounded-2xl border shadow-xl overflow-hidden",
                weather.type === "origin" && "bg-blue-50 border-e-cyan-50",
                weather.type === "destination" &&
                  "bg-emerald-50 border-b-lime-50",
                weather.type === "middle" && "bg-white border-slate-200"
              )}
            >
              {/* HEADER */}
              <div className='flex items-center justify-between px-4'>
                <div>
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      weather.type === "origin" && "text-cyan-700",
                      weather.type === "destination" && "text-lime-700",
                      weather.type === "middle" && "text-slate-900"
                    )}
                  >
                    {weather.type === "origin" && "Trip Start"}
                    {weather.type === "destination" && "Trip End"}
                  </p>
                  <p className='text-[11px] uppercase tracking-wider text-slate-400'>
                    Current Weather
                  </p>

                  <p>{weather.condition}</p>
                </div>

                <div className='text-3xl'>{weather.icon}</div>
              </div>

              {/* BODY */}
              <div className='px-4 pb-4'>
                <div className='flex items-end gap-1'>
                  <span className='text-[40px] font-bold leading-none text-slate-900'>
                    {weather.temp}
                  </span>
                  <span className='mb-1 text-sm font-medium text-slate-500'>
                    °C
                  </span>
                </div>

                <p className='mt-1 text-sm font-medium text-slate-700 capitalize'>
                  {weather.condition}
                </p>

                <div className='mt-4 flex justify-between text-[11px]'>
                  <div>
                    <p className='uppercase tracking-wide text-slate-400'>
                      Latitude
                    </p>
                    <p className='font-semibold text-slate-800'>
                      {weather.lat.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className='uppercase tracking-wide text-slate-400'>
                      Longitude
                    </p>
                    <p className='font-semibold text-slate-800'>
                      {weather.lng.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* ARROW */}
              <div
                className={cn(
                  "absolute left-1/2 -bottom-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b",
                  weather.type === "origin" && "bg-blue-50 border-blue-300",
                  weather.type === "destination" &&
                    "bg-emerald-50 border-emerald-300",
                  weather.type === "middle" && "bg-white border-slate-200"
                )}
              />
            </Card>
          </motion.div>
        </AdvancedMarker>
      )}
    </AnimatePresence>
  );
};

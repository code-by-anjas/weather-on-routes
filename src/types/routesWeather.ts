// ==============================
// RAW WEATHER DATA (DARI API)
// ==============================
type CleanWeatherData = {
  lat: number;
  lng: number;

  temp: number; // suhu dalam °C
  condition: string; // ex: "cloudy", "rain", "clear"
  icon: string; // ex: "☁️", "🌧️", "☀️"
  humidity?: number; // optional
  windSpeed?: number; // optional
};

// ==============================
// WEATHER ON ROUTE (DENGAN TIPE POSISI)
// ==============================
type WeatherRouteType = "origin" | "destination" | "middle";

type WeatherWithType = CleanWeatherData & {
  type: WeatherRouteType;
};

// ==============================
// COMPONENT PROPS
// ==============================

// Marker Pill
type WeatherMarkerProps = {
  weather: WeatherWithType;
  onSelect: (weather: WeatherWithType) => void;
};

// Popup Card
type WeatherPopupProps = {
  weather: WeatherWithType | null;
  onClose: () => void;
};

// Main Layer
type RouteWeatherLayerProps = {
  encodedPath: string;
};

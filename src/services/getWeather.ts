// src/services/getWeather.ts

// 1. Interface Output (Bersih untuk UI)
export interface CleanWeatherData {
  lat: number;
  lng: number;
  temp: number;
  condition: string;
  icon: string;
}

// 2. Interface Input
export interface WeatherPoint {
  lat: number;
  lng: number;
}

// 3. Interface Response Raw dari Backend (Sesuai JSON Google + Tagging kita)
interface GoogleRawResponse {
  // Field tagging dari backend kita
  _requestLat: number;
  _requestLng: number;

  // Field asli dari Google JSON (Partial, ambil yg butuh aja)
  temperature?: {
    degrees?: number; // JSON asli pake 'degrees', bukan 'value'
    unit?: string;
  };
  weatherCondition?: {
    description?: {
      text?: string; // "Clear", "Rain", dll
    };
    type?: string; // "CLEAR", "RAIN", dll
  };
  // Tambahan opsional kalau mau dikembangin nanti
  wind?: {
    speed?: { value?: number; unit?: string };
  };
  precipitation?: {
    probability?: { percent?: number };
  };
}

// Helper icon
function getWeatherIcon(condition: string = ""): string {
  const c = condition.toLowerCase();
  // Logic simple mapping icon
  if (c.includes("rain") || c.includes("drizzle")) return "🌧️";
  if (c.includes("thunder")) return "⚡";
  if (c.includes("snow")) return "❄️";
  if (c.includes("cloud") || c.includes("overcast")) return "☁️";
  if (c.includes("clear") || c.includes("sunny")) return "☀️";
  if (c.includes("fog") || c.includes("mist") || c.includes("haze"))
    return "🌫️";
  return "🌤️";
}

const getWeatherBatch = async (
  points: WeatherPoint[]
): Promise<CleanWeatherData[]> => {
  try {
    const res = await fetch("/api/weather", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ points }),
    });

    if (!res.ok) throw new Error("Failed to fetch weather API");

    // Casting ke Interface Raw yang baru
    const rawResults = (await res.json()) as GoogleRawResponse[];

    // Mapping Logic (Disesuaikan dengan field JSON asli)
    const cleanData: CleanWeatherData[] = rawResults.map((item) => {
      // Ambil text kondisi, prioritas deskripsi text, fallback ke type
      const conditionText =
        item.weatherCondition?.description?.text ||
        item.weatherCondition?.type ||
        "Unknown";

      return {
        lat: item._requestLat,
        lng: item._requestLng,
        // JSON Google pake 'degrees', default ke 0 kalo null
        temp: item.temperature?.degrees ?? 0,
        condition: conditionText,
        icon: getWeatherIcon(conditionText),
      };
    });

    return cleanData;
  } catch (err) {
    console.error("Service Error:", err);
    return [];
  }
};

export default getWeatherBatch;

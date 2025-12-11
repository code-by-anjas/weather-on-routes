import { configs } from "@/lib/config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { points } = (await req.json()) as {
      points: { lat: number; lng: number }[];
    };

    if (!points?.length) {
      return NextResponse.json({ error: "No points" }, { status: 400 });
    }

    const targetPoints = points;

    const promises = targetPoints.map(async (p) => {
      try {
        const url = new URL(
          "https://weather.googleapis.com/v1/currentConditions:lookup"
        );
        url.searchParams.append("key", configs.google.apiKey);
        url.searchParams.append("location.latitude", String(p.lat));
        url.searchParams.append("location.longitude", String(p.lng));

        const res = await fetch(url.toString(), {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          console.error(`Google API Error: ${res.status}`);
          return null;
        }

        const rawData = await res.json();

        // KEMBALIKAN RAW DATA + KOORDINAT REQUEST
        // Kita butuh lat/lng request untuk mapping marker nanti
        return {
          ...rawData, // Data mentah dari Google (currentConditions, dll)
          _requestLat: p.lat, // Tagging koordinat request
          _requestLng: p.lng,
        };
      } catch (e) {
        console.error("Fetch individual failed:", e);
        return null;
      }
    });

    const results = await Promise.all(promises);

    // Return data mentah yang berhasil saja
    return NextResponse.json(results.filter((r) => r !== null));
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

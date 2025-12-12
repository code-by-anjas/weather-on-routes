export const configs = {
  google: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    mapId: process.env.NEXT_PUBLIC_MAP_ID as string,
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
  },
  redis: {
    url: process.env.UPSTASH_REDIS_REST_URL as string,
    token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
  },
};

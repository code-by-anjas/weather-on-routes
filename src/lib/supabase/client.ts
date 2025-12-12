import { createBrowserClient } from "@supabase/ssr";
import { configs } from "../config";

export const supabase = createBrowserClient(
  configs.supabase.url,
  configs.supabase.publishableKey
);

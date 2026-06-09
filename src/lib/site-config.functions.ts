import { createServerFn } from "@tanstack/react-start";

export const getPublicSiteConfig = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("app_settings")
      .select("gtm_id")
      .eq("id", 1)
      .maybeSingle();
    return { gtmId: (data?.gtm_id as string | undefined) ?? "GTM-PG2T4NGD" };
  } catch {
    return { gtmId: "GTM-PG2T4NGD" };
  }
});

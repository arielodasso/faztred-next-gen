import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_URL as DEFAULT_WHATSAPP_URL } from "@/lib/site-data";

export interface TrustLogo {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
}

export interface AppSettings {
  contact_email: string;
  whatsapp_number: string;
  whatsapp_message: string;
}

function buildWhatsappUrl(number: string, message: string) {
  const clean = (number || "").replace(/[^\d]/g, "");
  const text = encodeURIComponent(message || "");
  if (!clean) return DEFAULT_WHATSAPP_URL;
  return `https://api.whatsapp.com/send/?phone=${clean}&text=${text}`;
}

export function useAppSettings() {
  const { data } = useQuery({
    queryKey: ["app_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("app_settings")
        .select("contact_email, whatsapp_number, whatsapp_message")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as AppSettings | null;
    },
    staleTime: 5 * 60 * 1000,
  });

  const whatsappUrl = data
    ? buildWhatsappUrl(data.whatsapp_number, data.whatsapp_message)
    : DEFAULT_WHATSAPP_URL;

  return { settings: data, whatsappUrl };
}

export function useTrustLogos() {
  const { data } = useQuery({
    queryKey: ["trust_logos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trust_logos")
        .select("id, name, logo_url, website_url")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as TrustLogo[];
    },
    staleTime: 5 * 60 * 1000,
  });

  return data ?? [];
}

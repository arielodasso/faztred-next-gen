import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { signMediaUrl } from "@/lib/useSignedMediaUrl";

export interface HeroOverride {
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  image?: string | null;
  loaded: boolean;
}

export function usePageHero(pageKey: string): HeroOverride {
  const [state, setState] = useState<HeroOverride>({ loaded: false });
  useEffect(() => {
    let active = true;
    if (!pageKey) {
      setState({ loaded: true });
      return;
    }
    supabase
      .from("page_heroes")
      .select("eyebrow, title, subtitle, image_url")
      .eq("page_key", pageKey)
      .maybeSingle()
      .then(async ({ data }) => {
        const image = await signMediaUrl(data?.image_url ?? null);
        if (!active) return;
        setState({
          eyebrow: data?.eyebrow ?? null,
          title: data?.title ?? null,
          subtitle: data?.subtitle ?? null,
          image,
          loaded: true,
        });
      });
    return () => {
      active = false;
    };
  }, [pageKey]);
  return state;
}

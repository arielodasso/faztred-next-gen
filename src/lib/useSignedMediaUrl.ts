import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const ONE_YEAR = 60 * 60 * 24 * 365;
const cache = new Map<string, string>();

/** Resuelve un path del bucket privado `site-media` a una signed URL. */
export async function signMediaUrl(path: string | null | undefined): Promise<string | null> {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  const cached = cache.get(path);
  if (cached) return cached;
  const { data } = await supabase.storage.from("site-media").createSignedUrl(path, ONE_YEAR);
  if (data?.signedUrl) {
    cache.set(path, data.signedUrl);
    return data.signedUrl;
  }
  return null;
}

export function useSignedMediaUrl(path: string | null | undefined): string | null {
  const initial = path && (path.startsWith("http") || path.startsWith("/")) ? path : null;
  const [url, setUrl] = useState<string | null>(initial ?? (path ? cache.get(path) ?? null : null));
  useEffect(() => {
    let active = true;
    if (!path) {
      setUrl(null);
      return;
    }
    signMediaUrl(path).then((u) => {
      if (active) setUrl(u);
    });
    return () => {
      active = false;
    };
  }, [path]);
  return url;
}

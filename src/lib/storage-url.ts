import { supabase } from "@/integrations/supabase/client";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Resolve a value stored in DB (either a storage path or a full URL) into
 * a usable image URL. For private buckets, generates a long-lived signed URL.
 */
export async function resolveStorageUrl(
  bucket: string,
  value: string | null | undefined,
): Promise<string | null> {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) {
    // Legacy public URL — try to detect if it embeds a path we should re-sign.
    const marker = `/storage/v1/object/public/${bucket}/`;
    const idx = value.indexOf(marker);
    if (idx >= 0) {
      const path = decodeURIComponent(value.slice(idx + marker.length));
      const { data } = await supabase.storage.from(bucket).createSignedUrl(path, ONE_YEAR);
      return data?.signedUrl ?? value;
    }
    return value;
  }
  const { data } = await supabase.storage.from(bucket).createSignedUrl(value, ONE_YEAR);
  return data?.signedUrl ?? null;
}

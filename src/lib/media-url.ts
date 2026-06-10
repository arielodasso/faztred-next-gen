/** Convierte un path del bucket "site-media" en una URL servida por el proxy público. */
export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `/api/public/media/${path}`;
}

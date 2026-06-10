/**
 * Compatibilidad: en SPA estática no podemos proxear el bucket privado.
 * Para URLs sincrónicas devolvemos null y exigimos resolver con `signMediaUrl`
 * (o el hook `useSignedMediaUrl`). URLs absolutas o paths absolutos se devuelven tal cual.
 */
export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return null;
}

export { signMediaUrl, useSignedMediaUrl } from "./useSignedMediaUrl";

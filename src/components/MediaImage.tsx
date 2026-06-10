import { useSignedMediaUrl } from "@/lib/useSignedMediaUrl";
import { Image as ImageIcon } from "lucide-react";

interface Props {
  path: string | null | undefined;
  alt?: string;
  className?: string;
  imgClassName?: string;
}

/** Renderiza una imagen del bucket `site-media` resolviendo la signed URL en cliente. */
export function MediaImage({ path, alt = "", className, imgClassName }: Props) {
  const url = useSignedMediaUrl(path);
  if (!url) {
    return (
      <div className={className ?? "h-full w-full bg-black/30 flex items-center justify-center"}>
        <ImageIcon className="h-5 w-5 text-white/30" />
      </div>
    );
  }
  return <img src={url} alt={alt} className={imgClassName ?? className} />;
}

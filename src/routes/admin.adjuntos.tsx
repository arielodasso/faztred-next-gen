
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";


interface Attachment {
  id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  description: string | null;
  created_at: string;
}

function AdjuntosPage() {
  const [items, setItems] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("client_attachments").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setItems((data ?? []) as Attachment[]); setLoading(false); });
  }, []);

  const download = async (a: Attachment) => {
    const { data, error } = await supabase.storage.from("client-attachments").createSignedUrl(a.storage_path, 60);
    if (error || !data) { toast.error("No se pudo descargar"); return; }
    window.open(data.signedUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Mis adjuntos</h1>
        <p className="text-sm text-white/50 mt-1">Archivos compartidos por Faztred.</p>
      </header>

      {loading ? (
        <p className="text-sm text-white/50">Cargando...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-white/50">Aún no hay adjuntos.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((a) => (
            <li key={a.id} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <FileText className="h-5 w-5 text-white/60" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{a.file_name}</p>
                {a.description && <p className="text-xs text-white/50 truncate">{a.description}</p>}
                <p className="text-[11px] text-white/40">
                  {((a.size_bytes ?? 0) / 1024 / 1024).toFixed(2)} MB · {new Date(a.created_at).toLocaleDateString("es-AR")}
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => download(a)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/15"
              >
                <Download className="h-4 w-4 mr-1" /> Descargar
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdjuntosPage;

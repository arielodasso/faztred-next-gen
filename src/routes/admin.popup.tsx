
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Upload } from "lucide-react";


interface Cfg {
  enabled: boolean;
  title: string;
  description: string;
  image_url: string | null;
  button_label: string | null;
  button_url: string | null;
}

function PopupPage() {
  const [cfg, setCfg] = useState<Cfg | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const resolvePreview = async (path: string | null) => {
    if (!path) { setPreviewUrl(null); return; }
    if (/^https?:\/\//i.test(path)) { setPreviewUrl(path); return; }
    const { data } = await supabase.storage.from("popup-images").createSignedUrl(path, 60 * 60);
    setPreviewUrl(data?.signedUrl ?? null);
  };

  useEffect(() => {
    supabase.from("popup_config").select("*").eq("id", 1).single().then(({ data }) => {
      if (data) {
        const c = data as Cfg;
        setCfg(c);
        resolvePreview(c.image_url);
      }
    });
  }, []);

  const save = async () => {
    if (!cfg) return;
    const { error } = await supabase
      .from("popup_config")
      .update({ ...cfg, version: Math.floor(Date.now() / 1000) })
      .eq("id", 1);
    if (error) toast.error(error.message);
    else toast.success("Popup actualizado. Los visitantes lo verán nuevamente.");
  };

  const upload = async (file: File) => {
    setUploading(true);
    const path = `popup-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const { error } = await supabase.storage.from("popup-images").upload(path, file, { upsert: true });
    if (error) { toast.error(error.message); setUploading(false); return; }
    setCfg((c) => c ? { ...c, image_url: path } : c);
    await resolvePreview(path);
    setUploading(false);
  };

  if (!cfg) return <p className="text-white/50">Cargando...</p>;

  return (
    <div className="space-y-6 max-w-2xl">
      <header>
        <h1 className="text-2xl font-bold">Popup de bienvenida</h1>
        <p className="text-sm text-white/50 mt-1">Se muestra a cada visitante en su primera visita.</p>
      </header>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-5">
        <div className="flex items-center justify-between">
          <Label className="text-white/80">Activo</Label>
          <Switch checked={cfg.enabled} onCheckedChange={(v) => setCfg({ ...cfg, enabled: v })} />
        </div>
        <div>
          <Label className="text-white/80">Título</Label>
          <Input value={cfg.title} onChange={(e) => setCfg({ ...cfg, title: e.target.value })} className="mt-1 bg-black/30 border-white/10" />
        </div>
        <div>
          <Label className="text-white/80">Descripción</Label>
          <Textarea value={cfg.description} onChange={(e) => setCfg({ ...cfg, description: e.target.value })} className="mt-1 bg-black/30 border-white/10" rows={4} />
        </div>
        <div>
          <Label className="text-white/80">Imagen</Label>
          <div className="mt-1 flex items-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 bg-black/30 hover:bg-white/5 text-sm">
              <Upload className="h-4 w-4" />
              {uploading ? "Subiendo..." : "Subir imagen"}
              <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            </label>
            {cfg.image_url && (
              <button onClick={() => { setCfg({ ...cfg, image_url: null }); setPreviewUrl(null); }} className="text-xs text-white/70 hover:text-red-400">
                Quitar
              </button>
            )}
          </div>
          {previewUrl && <img src={previewUrl} alt="" className="mt-3 max-h-40 rounded-md border border-white/10" />}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-white/80">Texto del botón</Label>
            <Input value={cfg.button_label ?? ""} onChange={(e) => setCfg({ ...cfg, button_label: e.target.value })} className="mt-1 bg-black/30 border-white/10" />
          </div>
          <div>
            <Label className="text-white/80">URL del botón</Label>
            <Input value={cfg.button_url ?? ""} onChange={(e) => setCfg({ ...cfg, button_url: e.target.value })} className="mt-1 bg-black/30 border-white/10" placeholder="/servicios" />
          </div>
        </div>
        <Button onClick={save} className="w-full">Guardar cambios</Button>
      </div>
    </div>
  );
}

export default PopupPage;

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ConfirmDialog } from "@/components/site/ConfirmDialog";
import { toast } from "sonner";
import { Upload, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/confianza")({
  component: TrustPage,
});

interface Logo {
  id: string;
  name: string;
  logo_url: string; // storage path within trust-logos bucket (or legacy URL)
  website_url: string | null;
  display_order: number;
  is_active: boolean;
}

interface LogoWithUrl extends Logo {
  display_url: string;
}

const ONE_YEAR = 60 * 60 * 24 * 365;

async function resolve(path: string): Promise<string> {
  if (/^https?:\/\//i.test(path)) return path;
  const { data } = await supabase.storage.from("trust-logos").createSignedUrl(path, ONE_YEAR);
  return data?.signedUrl ?? "";
}

function TrustPage() {
  const [logos, setLogos] = useState<LogoWithUrl[]>([]);
  const [newLogo, setNewLogo] = useState({ name: "", website_url: "" });
  const [file, setFile] = useState<File | null>(null);
  const [toDelete, setToDelete] = useState<LogoWithUrl | null>(null);

  const load = async () => {
    const { data } = await supabase.from("trust_logos").select("*").order("display_order");
    const rows = (data ?? []) as Logo[];
    const resolved = await Promise.all(
      rows.map(async (r) => ({ ...r, display_url: await resolve(r.logo_url) })),
    );
    setLogos(resolved);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!file || !newLogo.name) { toast.error("Nombre e imagen requeridos"); return; }
    const path = `logo-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("trust-logos").upload(path, file);
    if (upErr) { toast.error(upErr.message); return; }
    const { error } = await supabase.from("trust_logos").insert({
      name: newLogo.name,
      logo_url: path,
      website_url: newLogo.website_url || null,
      display_order: logos.length,
    });
    if (error) toast.error(error.message);
    else { toast.success("Logo agregado"); setNewLogo({ name: "", website_url: "" }); setFile(null); load(); }
  };

  const toggle = async (l: LogoWithUrl) => {
    await supabase.from("trust_logos").update({ is_active: !l.is_active }).eq("id", l.id);
    load();
  };

  const confirmRemove = async () => {
    if (!toDelete) return;
    if (!/^https?:\/\//i.test(toDelete.logo_url)) {
      await supabase.storage.from("trust-logos").remove([toDelete.logo_url]);
    }
    await supabase.from("trust_logos").delete().eq("id", toDelete.id);
    setToDelete(null);
    toast.success("Logo eliminado");
    load();
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Confianza · Logos</h1>
        <p className="text-sm text-white/60 mt-1">Logos que aparecen en la home.</p>
      </header>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
        <h2 className="font-semibold">Agregar logo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label className="text-white/80">Nombre</Label>
            <Input value={newLogo.name} onChange={(e) => setNewLogo({ ...newLogo, name: e.target.value })} className="mt-1 bg-black/30 border-white/10 text-white" />
          </div>
          <div>
            <Label className="text-white/80">Sitio web (opcional)</Label>
            <Input value={newLogo.website_url} onChange={(e) => setNewLogo({ ...newLogo, website_url: e.target.value })} className="mt-1 bg-black/30 border-white/10 text-white" placeholder="https://..." />
          </div>
        </div>
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/15 bg-black/30 hover:bg-white/10 text-sm text-white">
          <Upload className="h-4 w-4" />
          {file ? file.name : "Subir imagen del logo"}
          <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <Button onClick={add}>Agregar</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {logos.map((l) => (
          <div key={l.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
            <div className="aspect-video flex items-center justify-center bg-white rounded-md p-3">
              {l.display_url && <img src={l.display_url} alt={l.name} className="max-h-full max-w-full object-contain" />}
            </div>
            <p className="text-sm font-medium truncate text-white">{l.name}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <Switch checked={l.is_active} onCheckedChange={() => toggle(l)} />
                {l.is_active ? "Activo" : "Oculto"}
              </div>
              <button onClick={() => setToDelete(l)} className="text-white/50 hover:text-red-400" aria-label={`Eliminar ${l.name}`}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Eliminar logo"
        description={toDelete ? `¿Eliminar el logo "${toDelete.name}"? Esta acción no se puede deshacer.` : ""}
        onConfirm={confirmRemove}
      />
    </div>
  );
}

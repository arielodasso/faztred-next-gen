
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, Image as ImageIcon, X, Save } from "lucide-react";
import { mediaUrl } from "@/lib/media-url";


interface Hero {
  id?: string;
  page_key: string;
  eyebrow: string | null;
  title: string;
  subtitle: string | null;
  image_url: string | null;
}

const PAGES: Array<{ key: string; label: string; note?: string }> = [
  { key: "home", label: "Home" },
  { key: "servicios", label: "Servicios" },
  { key: "productos", label: "Productos" },
  { key: "proyectos", label: "Proyectos" },
  { key: "contacto", label: "Contacto" },
  { key: "login", label: "Login" },
];

function HeroesAdminPage() {
  const [heroes, setHeroes] = useState<Record<string, Hero>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.from("page_heroes").select("*");
    const map: Record<string, Hero> = {};
    for (const p of PAGES) {
      const found = (data ?? []).find((x: Hero) => x.page_key === p.key);
      map[p.key] = found ?? { page_key: p.key, eyebrow: "", title: "", subtitle: "", image_url: null };
    }
    setHeroes(map);
  };

  useEffect(() => {
    load();
  }, []);

  const patch = (key: string, p: Partial<Hero>) => {
    setHeroes((h) => ({ ...h, [key]: { ...h[key], ...p } }));
  };

  const uploadImage = async (key: string, file: File) => {
    const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `heroes/${key}-${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from("site-media").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    patch(key, { image_url: path });
  };

  const save = async (key: string) => {
    setSaving(key);
    const h = heroes[key];
    const payload = {
      page_key: key,
      eyebrow: h.eyebrow,
      title: h.title,
      subtitle: h.subtitle,
      image_url: h.image_url,
    };
    const { error } = await supabase.from("page_heroes").upsert(payload, { onConflict: "page_key" });
    setSaving(null);
    if (error) toast.error(error.message);
    else toast.success(`Hero de ${key} actualizado`);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Encabezados</h1>
        <p className="text-sm text-white/60 mt-1">Editá los heros de cada página del sitio.</p>
      </header>

      <div className="space-y-4">
        {PAGES.map(({ key, label, note }) => {
          const h = heroes[key];
          if (!h) return null;
          return (
            <div key={key} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">{label}</h2>
                  <p className="text-xs text-white/40 mt-0.5">/{key === "home" ? "" : key}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => save(key)}
                  disabled={saving === key}
                  className="bg-primary text-white"
                >
                  <Save className="h-4 w-4 mr-1" /> {saving === key ? "Guardando…" : "Guardar"}
                </Button>
              </div>

              {note && <p className="text-[11px] text-yellow-300/80 bg-yellow-500/10 border border-yellow-500/20 rounded px-3 py-2">{note}</p>}

              <div className="grid md:grid-cols-[1fr_280px] gap-5">
                <div className="space-y-3">
                  <div>
                    <Label className="text-white/70 text-xs">Eyebrow</Label>
                    <Input
                      value={h.eyebrow ?? ""}
                      onChange={(e) => patch(key, { eyebrow: e.target.value })}
                      className="bg-black/30 border-white/10 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-white/70 text-xs">Título</Label>
                    <Input
                      value={h.title ?? ""}
                      onChange={(e) => patch(key, { title: e.target.value })}
                      className="bg-black/30 border-white/10 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-white/70 text-xs">Subtítulo</Label>
                    <Textarea
                      value={h.subtitle ?? ""}
                      onChange={(e) => patch(key, { subtitle: e.target.value })}
                      rows={2}
                      className="bg-black/30 border-white/10 text-white mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white/70 text-xs">Imagen de hero</Label>
                  <div className="mt-1 aspect-video rounded-md bg-black/40 overflow-hidden border border-white/10 relative">
                    {h.image_url ? (
                      <>
                        <img src={mediaUrl(h.image_url) ?? ""} alt="" className="h-full w-full object-cover" />
                        <button
                          onClick={() => patch(key, { image_url: null })}
                          className="absolute top-2 right-2 bg-black/70 rounded-full p-1.5 text-white hover:bg-red-500"
                          aria-label="Quitar"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-white/30">
                        <ImageIcon className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <label className="mt-2 cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/15 bg-black/30 hover:bg-white/10 text-xs text-white">
                    <Upload className="h-3.5 w-3.5" />
                    Subir imagen
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => e.target.files?.[0] && uploadImage(key, e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HeroesAdminPage;

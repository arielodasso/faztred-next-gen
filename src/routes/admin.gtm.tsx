import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/gtm")({
  component: GtmPage,
});

function GtmPage() {
  const [gtmId, setGtmId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("app_settings")
      .select("gtm_id")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setGtmId((data as { gtm_id: string }).gtm_id ?? "");
        setLoading(false);
      });
  }, []);

  const save = async () => {
    const value = gtmId.trim();
    if (!/^GTM-[A-Z0-9]+$/i.test(value)) {
      toast.error("Formato inválido. Ejemplo: GTM-XXXXXXX");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("app_settings").update({ gtm_id: value }).eq("id", 1);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("ID de GTM actualizado. Refrescá el sitio para verlo aplicado.");
  };

  if (loading) return <p className="text-white/50">Cargando...</p>;

  return (
    <div className="space-y-6 max-w-xl">
      <header>
        <h1 className="text-2xl font-bold">Google Tag Manager</h1>
        <p className="text-sm text-white/50 mt-1">
          ID del contenedor de GTM. Se inyecta automáticamente en todas las páginas del sitio.
        </p>
      </header>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-5">
        <div>
          <Label className="text-white/80">ID del contenedor</Label>
          <Input
            value={gtmId}
            onChange={(e) => setGtmId(e.target.value.toUpperCase())}
            className="mt-1 bg-black/30 border-white/10 font-mono"
            placeholder="GTM-XXXXXXX"
          />
          <p className="mt-2 text-xs text-white/40">
            Formato: <code className="text-white/60">GTM-XXXXXXX</code>. Lo encontrás en tu cuenta de Google Tag Manager.
          </p>
        </div>
        <Button onClick={save} disabled={saving} className="w-full">
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-sm text-white/60">
        <p className="font-semibold text-white/80 mb-2">¿Cómo funciona?</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>El script principal se inserta en el <code>&lt;head&gt;</code> de toda la app.</li>
          <li>El fallback <code>&lt;noscript&gt;</code> se inserta apenas abre el <code>&lt;body&gt;</code>.</li>
          <li>Al cambiar este ID, todas las páginas (actuales y futuras) usan el nuevo contenedor.</li>
        </ul>
      </div>
    </div>
  );
}

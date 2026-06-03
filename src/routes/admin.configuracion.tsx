import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/configuracion")({
  component: SettingsPage,
});

interface Settings {
  contact_email: string;
  whatsapp_number: string;
  whatsapp_message: string;
}

function SettingsPage() {
  const [s, setS] = useState<Settings | null>(null);

  useEffect(() => {
    supabase.from("app_settings").select("*").eq("id", 1).single().then(({ data }) => {
      if (data) setS(data as Settings);
    });
  }, []);

  const save = async () => {
    if (!s) return;
    const { error } = await supabase.from("app_settings").update(s).eq("id", 1);
    if (error) toast.error(error.message);
    else toast.success("Configuración guardada");
  };

  if (!s) return <p className="text-white/50">Cargando...</p>;

  return (
    <div className="space-y-6 max-w-xl">
      <header>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-sm text-white/50 mt-1">Email de contacto y WhatsApp del sitio.</p>
      </header>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-5">
        <div>
          <Label className="text-white/80">Email donde llegan los formularios</Label>
          <Input type="email" value={s.contact_email} onChange={(e) => setS({ ...s, contact_email: e.target.value })} className="mt-1 bg-black/30 border-white/10" />
        </div>
        <div>
          <Label className="text-white/80">Número de WhatsApp (solo dígitos, con código de país)</Label>
          <Input value={s.whatsapp_number} onChange={(e) => setS({ ...s, whatsapp_number: e.target.value.replace(/\D/g, "") })} className="mt-1 bg-black/30 border-white/10" placeholder="5491100000000" />
        </div>
        <div>
          <Label className="text-white/80">Mensaje predeterminado de WhatsApp</Label>
          <Textarea value={s.whatsapp_message} onChange={(e) => setS({ ...s, whatsapp_message: e.target.value })} rows={3} className="mt-1 bg-black/30 border-white/10" />
        </div>
        <Button onClick={save} className="w-full">Guardar cambios</Button>
      </div>
    </div>
  );
}

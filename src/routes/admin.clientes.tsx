import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, Trash2, Download, FileText } from "lucide-react";

export const Route = createFileRoute("/admin/clientes")({
  component: ClientesPage,
});

interface Client {
  id: string;
  email: string | null;
  full_name: string | null;
}

interface Attachment {
  id: string;
  client_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  description: string | null;
  created_at: string;
}

const MAX = 50 * 1024 * 1024;

function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selected, setSelected] = useState<Client | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");

  const loadClients = async () => {
    const { data: roleRows } = await supabase.from("user_roles").select("user_id").eq("role", "client_admin");
    const ids = (roleRows ?? []).map((r) => r.user_id);
    if (ids.length === 0) { setClients([]); return; }
    const { data: profiles } = await supabase.from("profiles").select("id, email, full_name").in("id", ids);
    setClients((profiles ?? []) as Client[]);
  };

  const loadAttachments = async (clientId: string) => {
    const { data } = await supabase.from("client_attachments").select("*").eq("client_id", clientId).order("created_at", { ascending: false });
    setAttachments((data ?? []) as Attachment[]);
  };

  useEffect(() => { loadClients(); }, []);
  useEffect(() => { if (selected) loadAttachments(selected.id); }, [selected]);

  const upload = async (file: File) => {
    if (!selected) return;
    if (file.size > MAX) { toast.error("Máximo 50MB"); return; }
    setUploading(true);
    const safe = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `${selected.id}/${Date.now()}-${safe}`;
    const { error: upErr } = await supabase.storage.from("client-attachments").upload(path, file);
    if (upErr) { toast.error(upErr.message); setUploading(false); return; }
    const { error } = await supabase.from("client_attachments").insert({
      client_id: selected.id,
      file_name: file.name,
      storage_path: path,
      mime_type: file.type,
      size_bytes: file.size,
      description: description || null,
    });
    if (error) toast.error(error.message);
    else { toast.success("Subido"); setDescription(""); loadAttachments(selected.id); }
    setUploading(false);
  };

  const download = async (a: Attachment) => {
    const { data, error } = await supabase.storage.from("client-attachments").createSignedUrl(a.storage_path, 60);
    if (error || !data) { toast.error("No se pudo descargar"); return; }
    window.open(data.signedUrl, "_blank");
  };

  const remove = async (a: Attachment) => {
    if (!confirm(`¿Eliminar ${a.file_name}?`)) return;
    await supabase.storage.from("client-attachments").remove([a.storage_path]);
    await supabase.from("client_attachments").delete().eq("id", a.id);
    if (selected) loadAttachments(selected.id);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Clientes</h1>
        <p className="text-sm text-white/50 mt-1">Gestioná los adjuntos visibles para cada cliente.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {clients.length === 0 ? (
            <p className="p-6 text-sm text-white/50">Aún no hay clientes. Creá uno en Usuarios.</p>
          ) : (
            <ul className="divide-y divide-white/5">
              {clients.map((c) => (
                <li key={c.id}>
                  <button onClick={() => setSelected(c)} className={`w-full text-left px-4 py-3 hover:bg-white/5 ${selected?.id === c.id ? "bg-white/5" : ""}`}>
                    <div className="font-medium">{c.full_name ?? c.email}</div>
                    <div className="text-xs text-white/50">{c.email}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          {selected ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold">{selected.full_name ?? selected.email}</h2>
                <p className="text-xs text-white/40">{selected.email}</p>
              </div>

              <div className="space-y-2">
                <Input placeholder="Descripción opcional" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 bg-black/30 hover:bg-white/5 text-sm">
                  <Upload className="h-4 w-4" />
                  {uploading ? "Subiendo..." : "Subir archivo (máx 50MB)"}
                  <input type="file" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
                </label>
              </div>

              <ul className="space-y-2">
                {attachments.length === 0 && <p className="text-sm text-white/50">Sin adjuntos.</p>}
                {attachments.map((a) => (
                  <li key={a.id} className="flex items-center gap-3 p-3 rounded-md border border-white/10 bg-black/20">
                    <FileText className="h-4 w-4 text-white/60 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{a.file_name}</p>
                      {a.description && <p className="text-xs text-white/50 truncate">{a.description}</p>}
                      <p className="text-[11px] text-white/40">
                        {((a.size_bytes ?? 0) / 1024 / 1024).toFixed(2)} MB · {new Date(a.created_at).toLocaleDateString("es-AR")}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => download(a)}><Download className="h-4 w-4" /></Button>
                    <button onClick={() => remove(a)} className="text-white/40 hover:text-red-400 p-2"><Trash2 className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-white/50">Seleccioná un cliente.</p>
          )}
        </div>
      </div>
    </div>
  );
}

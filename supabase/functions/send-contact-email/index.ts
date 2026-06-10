// Edge function: envía email vía Resend al recibir un formulario de contacto.
// Llamada desde el cliente con supabase.functions.invoke('send-contact-email', { body }).
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Payload {
  name?: string;
  email?: string;
  phone?: string | null;
  company?: string | null;
  message?: string;
  source?: string | null;
}

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }

  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), {
      status: 400,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ ok: false, error: "missing_fields" }), {
      status: 400,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY no configurada");
    return new Response(JSON.stringify({ ok: false, error: "missing_key" }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }

  const rows: Array<[string, string]> = [
    ["Nombre", name],
    ["Email", email],
    ["Teléfono", data.phone ?? "-"],
    ["Empresa", data.company ?? "-"],
    ["Origen", data.source ?? "-"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0f172a;">
      <h2 style="margin:0 0 16px;font-size:20px;">Nueva consulta desde faztred.com.ar</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;color:#64748b;width:120px;">${k}</td><td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;">${escape(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:20px 0 8px;font-size:16px;">Mensaje</h3>
      <p style="white-space:pre-wrap;line-height:1.5;background:#f8fafc;padding:12px;border-radius:6px;border:1px solid #e2e8f0;">${escape(message)}</p>
    </div>
  `;
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMensaje:\n${message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Faztred Web <info@faztred.com.ar>",
      to: ["info@faztred.com.ar"],
      reply_to: email,
      subject: `Nueva consulta web — ${name}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend error", res.status, body);
    return new Response(JSON.stringify({ ok: false, error: "send_failed" }), {
      status: 502,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
});

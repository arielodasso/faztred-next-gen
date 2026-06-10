import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(60).optional().nullable(),
  company: z.string().trim().max(200).optional().nullable(),
  message: z.string().trim().min(1).max(5000),
  source: z.string().trim().max(60).optional().nullable(),
});

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY no configurada");
      return { ok: false, error: "missing_key" as const };
    }

    const rows: Array<[string, string]> = [
      ["Nombre", data.name],
      ["Email", data.email],
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
        <p style="white-space:pre-wrap;line-height:1.5;background:#f8fafc;padding:12px;border-radius:6px;border:1px solid #e2e8f0;">${escape(data.message)}</p>
      </div>
    `;

    const text =
      rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
      `\n\nMensaje:\n${data.message}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Faztred Web <onboarding@resend.dev>",
        to: ["info@faztred.com.ar"],
        reply_to: data.email,
        subject: `Nueva consulta web — ${data.name}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend error", res.status, body);
      return { ok: false, error: "send_failed" as const };
    }

    return { ok: true };
  });

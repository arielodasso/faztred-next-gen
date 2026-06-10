// Edge function: crear/eliminar usuarios. Requiere caller superadmin.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const PUBLISHABLE = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "unauthorized" }, 401);
  const token = authHeader.slice(7);

  // Verify caller and role with the user's JWT (RLS as user)
  const userClient = createClient(SUPABASE_URL, PUBLISHABLE, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData.user) return json({ error: "unauthorized" }, 401);
  const callerId = userData.user.id;

  const { data: roles } = await userClient
    .from("user_roles")
    .select("role")
    .eq("user_id", callerId);
  const isSuper = (roles ?? []).some((r: { role: string }) => r.role === "superadmin");
  if (!isSuper) return json({ error: "forbidden" }, 403);

  let body: { action?: string; payload?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (body.action === "create") {
    const p = body.payload ?? {};
    const email = String(p.email ?? "").trim();
    const password = String(p.password ?? "");
    const full_name = String(p.full_name ?? "").trim();
    const role = String(p.role ?? "");
    if (!email || password.length < 8 || password.length > 72 || !full_name) {
      return json({ error: "invalid_fields" }, 400);
    }
    if (role !== "superadmin" && role !== "client_admin") {
      return json({ error: "invalid_role" }, 400);
    }
    const { data: created, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });
    if (error || !created.user) return json({ error: error?.message ?? "create_failed" }, 400);
    await admin.from("user_roles").insert({ user_id: created.user.id, role });
    return json({ id: created.user.id });
  }

  if (body.action === "delete") {
    const p = body.payload ?? {};
    const user_id = String(p.user_id ?? "");
    if (!user_id) return json({ error: "missing_user_id" }, 400);
    if (user_id === callerId) return json({ error: "cannot_delete_self" }, 400);
    const { error } = await admin.auth.admin.deleteUser(user_id);
    if (error) return json({ error: error.message }, 400);
    return json({ ok: true });
  }

  return json({ error: "unknown_action" }, 400);
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}

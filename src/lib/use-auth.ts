import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export type AppRole = "superadmin" | "client_admin";

export interface AuthState {
  loading: boolean;
  session: Session | null;
  user: User | null;
  roles: AppRole[];
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    loading: true,
    session: null,
    user: null,
    roles: [],
  });

  useEffect(() => {
    let active = true;

    const loadRoles = async (userId: string): Promise<AppRole[]> => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      return (data ?? []).map((r: { role: AppRole }) => r.role);
    };

    const apply = async (session: Session | null) => {
      if (!active) return;
      if (!session?.user) {
        setState({ loading: false, session: null, user: null, roles: [] });
        return;
      }
      const roles = await loadRoles(session.user.id);
      if (!active) return;
      setState({ loading: false, session, user: session.user, roles });
    };

    supabase.auth.getSession().then(({ data }) => apply(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      apply(session);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}

export function hasRole(roles: AppRole[], r: AppRole) {
  return roles.includes(r);
}

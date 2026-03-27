"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { fetchMe } from "@/lib/auth/me";
import {
  DEV_AUTH_ENABLED,
  getDevSession,
  setDevSession,
  type DevAuthSession,
} from "@/lib/dev-auth";
import { getClaims, onAuthTokenChanged } from "@/lib/firebase/auth";

export type AuthState = {
  user: { email?: string } | null;
  claims: { tenant_id?: string; role?: string; plan?: string } | null;
  loading: boolean;
  source?: string;
  devLogin?: (email: string, senha: string) => Promise<void>;
  devLogout?: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthState["user"]>(null);
  const [claims, setClaims] = useState<AuthState["claims"]>(null);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Efeito para carregar sessão inicial (Dev ou Firebase)
  useEffect(() => {
    if (DEV_AUTH_ENABLED) {
      const initialDev = getDevSession();
      if (initialDev) {
        setUser({ email: initialDev.email });
        setClaims(initialDev.claims);
        setSource("dev");
      }
      setLoading(false);
      return;
    }

    const unsub = onAuthTokenChanged(async (u) => {
      setUser(u ? { email: u.email ?? undefined } : null);
      if (u) {
        setLoading(true);
        try {
          const me = await fetchMe();
          if (me.ok) {
            setClaims(me.claims ?? null);
            setSource(me.source);
          } else {
            // Se o BFF falhou (ex: 401), tenta pegar claims direto do Firebase
            const c = await getClaims(u);
            setClaims(c);
            setSource("firebase-direct");
          }
        } catch (err) {
          console.error("Auth error:", err);
          const c = await getClaims(u);
          setClaims(c);
          setSource("firebase-direct");
        } finally {
          setLoading(false);
        }
      } else {
        setClaims(null);
        setSource(undefined);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  async function devLogin(email: string, senha: string) {
    // validação bem simplezona só pra destravar dev
    const wantEmail = (process.env.NEXT_PUBLIC_DEV_AUTH_EMAIL || "admin@mardrix.local").toLowerCase();
    const wantPassword = process.env.NEXT_PUBLIC_DEV_AUTH_PASSWORD || "admin123";

    if (email.toLowerCase() !== wantEmail || senha !== wantPassword) {
      throw new Error("Credenciais inválidas");
    }

    const session: DevAuthSession = {
      email,
      claims: { tenant_id: "dev-tenant", role: "owner", plan: "starter" },
    };

    setDevSession(session);
    setUser({ email: session.email });
    setClaims(session.claims);
    setSource("dev");
  }

  function devLogout() {
    setDevSession(null);
    setUser(null);
    setClaims(null);
    setSource(undefined);
  }

  const value = useMemo(
    () => ({
      user,
      claims,
      loading,
      source,
      devLogin: DEV_AUTH_ENABLED ? devLogin : undefined,
      devLogout: DEV_AUTH_ENABLED ? devLogout : undefined,
    }),
    [user, claims, loading, source]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

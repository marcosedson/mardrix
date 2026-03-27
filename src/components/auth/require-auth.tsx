"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/auth-provider";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) router.replace("/login");
  }, [mounted, loading, user, router]);

  if (!mounted || loading) {
    return <div className="p-6 text-sm text-muted-foreground">Carregando…</div>;
  }

  if (!user) return null;

  return <>{children}</>;
}

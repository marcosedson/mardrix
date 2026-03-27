"use client";

import { logout } from "@/lib/firebase/auth";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const { user, claims, source, devLogout } = useAuth();
  if (!user) return null;

  async function onLogout() {
    if (devLogout) {
      devLogout();
      return;
    }
    await logout();
  }

  return (
    <div className="flex items-center gap-2">
      <div className="hidden text-xs text-muted-foreground md:block">
        {user.email}
        {claims?.tenant_id ? ` • ${claims.tenant_id}` : ""}
        {claims?.role ? ` • ${claims.role}` : ""}
        {source ? ` • ${source}` : ""}
      </div>
      <Button variant="secondary" onClick={onLogout}>
        Sair
      </Button>
    </div>
  );
}

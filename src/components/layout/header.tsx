"use client";

import { Sun } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <div className="text-sm text-muted-foreground">
        SaaS ERP • multitenancy (Fase 1)
      </div>

      <button
        type="button"
        disabled
        title="Toggle de tema será reativado quando ajustarmos a compatibilidade do next-themes."
        className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground"
      >
        <Sun className="h-4 w-4" />
        Tema
      </button>
    </header>
  );
}

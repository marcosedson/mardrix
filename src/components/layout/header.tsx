"use client";

import { Moon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <div className="text-sm text-muted-foreground">
        SaaS ERP • multitenancy (Fase 1)
      </div>

      <Button type="button" variant="outline" size="sm" disabled>
        <Moon className="h-4 w-4" />
        Tema
      </Button>
    </header>
  );
}

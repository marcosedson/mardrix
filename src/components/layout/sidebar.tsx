"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Barcode,
  Boxes,
  LayoutDashboard,
  ShoppingCart,
  Tags,
  Users,
  Truck,
  Wallet,
  FileText,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/clientes", label: "Clientes", Icon: Users },
  { href: "/fornecedores", label: "Fornecedores", Icon: Truck },
  { href: "/produtos", label: "Produtos", Icon: Barcode },
  { href: "/estoque", label: "Estoque", Icon: Boxes },
  { href: "/vendas", label: "Vendas", Icon: ShoppingCart },
  { href: "/compras", label: "Compras", Icon: ShoppingBag },
  { href: "/financeiro", label: "Financeiro", Icon: Wallet },
  { href: "/relatorios", label: "Relatórios", Icon: FileText },
  { href: "/etiquetas", label: "Etiquetas", Icon: Tags },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 shrink-0 border-r border-border bg-card">
      <div className="px-4 py-4">
        <div className="text-sm font-semibold tracking-wide text-foreground">
          MARDRIX
        </div>
        <div className="text-xs text-muted-foreground">ERP — Fase 1</div>
      </div>

      <nav className="px-2 pb-4">
        {nav.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

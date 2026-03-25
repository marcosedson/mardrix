import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          KPIs (placeholder): faturamento do mês, baixo estoque, contas vencendo,
          total de clientes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Faturamento (mês)" value="R$ 0,00" />
        <Card title="Produtos baixo estoque" value="0" />
        <Card title="Contas vencendo" value="0" />
        <Card title="Clientes" value="0" />
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm font-medium">Vendas últimos 30 dias</div>
        <div className="mt-2 text-sm text-muted-foreground">
          Gráfico virá com Recharts.
        </div>
      </div>
    </div>
  );
}


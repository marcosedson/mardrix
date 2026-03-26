import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <Card>
          <CardHeader>
            <CardTitle>Faturamento (mês)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">R$ 0,00</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Produtos baixo estoque</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">0</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contas vencendo</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">0</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">0</CardContent>
        </Card>
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

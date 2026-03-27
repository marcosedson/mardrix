"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Users, 
  Package, 
  CreditCard,
  Download
} from "lucide-react";

export default function RelatoriosPage() {
  const reports = [
    { title: "Vendas por Período", description: "Relatório detalhado de vendas em um intervalo de datas.", icon: TrendingUp },
    { title: "Lista de Clientes", description: "Todos os clientes cadastrados com informações de contato.", icon: Users },
    { title: "Posição de Estoque", description: "Lista de produtos com saldo atual e estoque mínimo.", icon: Package },
    { title: "Fluxo de Caixa", description: "Resumo de entradas e saídas financeiras por mês.", icon: CreditCard },
    { title: "Produtos Mais Vendidos", description: "Ranking dos itens com maior volume de saída.", icon: BarChart3 },
    { title: "Inadimplência", description: "Relatório de contas a receber vencidas e não pagas.", icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-sm text-muted-foreground">
          Gere relatórios inteligentes para auxiliar na tomada de decisão.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.title} className="group hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">{report.title}</CardTitle>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{report.description}</CardDescription>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 h-4 w-4" /> PDF
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import ComponentCard from "@/components/common/ComponentCard";
import DataTable from "@/components/common/DataTable";
import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import { getDashboard } from "@/services/dashboardService";
import React, { useEffect, useState } from "react";

interface DashboardState {
  metrics: {
    faturamentoDia: number;
    contasReceber: number;
    contasPagar: number;
    saldoCaixa: number;
  };
  recentSales: {
    id: string;
    customer: string;
    total: number;
    status: string;
    createdAt: string;
  }[];
}

const currency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [state, setState] = useState<DashboardState | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await getDashboard();
      if (response.error) {
        setError(response.error.message);
        setLoading(false);
        return;
      }
      setState(response.data ?? null);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return <LoadingState label="Carregando dashboard" />;
  }

  if (error || !state) {
    return <ErrorState message={error || "Falha ao carregar dashboard"} />;
  }

  const cards = [
    { title: "Faturamento do dia", value: currency(state.metrics.faturamentoDia) },
    { title: "Contas a receber", value: currency(state.metrics.contasReceber) },
    { title: "Contas a pagar", value: currency(state.metrics.contasPagar) },
    { title: "Saldo em caixa", value: currency(state.metrics.saldoCaixa) },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {cards.map((card) => (
        <div key={card.title} className="col-span-12 sm:col-span-6 xl:col-span-3">
          <ComponentCard title={card.title}>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white/90">{card.value}</p>
          </ComponentCard>
        </div>
      ))}

      <div className="col-span-12 xl:col-span-7">
        <ComponentCard title="Ultimas vendas">
          <DataTable
            columns={[
              { key: "id", label: "Pedido" },
              { key: "customer", label: "Cliente" },
              { key: "total", label: "Total" },
              { key: "status", label: "Status" },
              { key: "createdAt", label: "Data" },
            ]}
            rows={state.recentSales.map((sale) => ({
              ...sale,
              total: currency(sale.total),
            }))}
            page={1}
            pageSize={5}
            total={state.recentSales.length}
            onPageChange={() => undefined}
          />
        </ComponentCard>
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlySalesChart />
      </div>
    </div>
  );
}


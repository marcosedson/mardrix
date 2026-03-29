"use client";

import ComponentCard from "@/components/common/ComponentCard";
import ErrorState from "@/components/common/ErrorState";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import LoadingState from "@/components/common/LoadingState";
import Button from "@/components/ui/button/Button";
import { getCashSummary, updateCash } from "@/services/cashService";
import type { CashSummary } from "@/types/erp";
import React, { useEffect, useState } from "react";

export default function CashPage() {
  const [state, setState] = useState<CashSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const response = await getCashSummary();
    if (response.error || !response.data) {
      setError(response.error?.message ?? "Falha ao carregar caixa");
      setLoading(false);
      return;
    }

    setState(response.data);
    setError("");
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleAction = async (action: "open" | "close" | "movement", amount?: number) => {
    await updateCash({ action, amount });
    await load();
  };

  if (loading) {
    return <LoadingState label="Carregando caixa" />;
  }

  if (error || !state) {
    return <ErrorState message={error} onRetry={load} />;
  }

  const currency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Controle de Caixa" />
      <ComponentCard title="Resumo de caixa">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <p className="text-xs text-gray-500">Saldo atual</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {currency(state.currentBalance)}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <p className="text-xs text-gray-500">Entradas</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {currency(state.totalEntries)}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <p className="text-xs text-gray-500">Saidas</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {currency(state.totalExits)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => handleAction("open")}>Abrir caixa</Button>
          <Button variant="outline" onClick={() => handleAction("close")}>Fechar caixa</Button>
          <Button onClick={() => handleAction("movement", 150)}>Registrar entrada +150</Button>
          <Button variant="outline" onClick={() => handleAction("movement", -80)}>
            Registrar saida -80
          </Button>
        </div>
      </ComponentCard>
    </div>
  );
}


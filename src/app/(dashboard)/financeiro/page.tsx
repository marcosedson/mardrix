"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { lancamentoFinanceiroSchema } from "@/lib/crud/schemas";

type Lancamento = {
  id: string;
  descricao: string;
  tipo: "pagar" | "receber";
  valor: number;
  created_at?: string;
  updated_at?: string;
};

export default function FinanceiroPage() {
  return (
    <ResourcePage<Lancamento, typeof lancamentoFinanceiroSchema>
      title="Financeiro"
      resource="financeiro"
      schema={lancamentoFinanceiroSchema}
      defaultValues={{ descricao: "", tipo: "pagar", valor: 0 }}
      fields={[
        { name: "descricao", label: "Descrição" },
        {
          kind: "select",
          name: "tipo",
          label: "Tipo",
          options: [
            { value: "pagar", label: "A pagar" },
            { value: "receber", label: "A receber" },
          ],
        },
        { name: "valor", label: "Valor", type: "number" },
      ]}
      columns={[
        { key: "descricao", header: "Descrição" },
        {
          key: "tipo",
          header: "Tipo",
          render: (l) => (l.tipo === "pagar" ? "A pagar" : "A receber"),
        },
        {
          key: "valor",
          header: "Valor",
          render: (l) =>
            Number(l.valor ?? 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
        },
      ]}
    />
  );
}

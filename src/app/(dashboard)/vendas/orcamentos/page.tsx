"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { orcamentoSchema } from "@/lib/crud/schemas";

export default function OrcamentosPage() {
  return (
    <ResourcePage
      title="Orçamentos"
      resource="orcamentos"
      schema={orcamentoSchema}
      defaultValues={{
        cliente_nome: "",
        data: new Date().toISOString().split("T")[0],
        validade: "",
        valor_total: 0,
        status: "Aberto",
        observacoes: "",
      }}
      fields={[
        { name: "cliente_nome", label: "Cliente", placeholder: "Selecione o cliente" },
        { name: "data", label: "Data", type: "date" },
        { name: "validade", label: "Validade", type: "date" },
        { name: "valor_total", label: "Valor Total (R$)", type: "number" },
        {
          kind: "select",
          name: "status",
          label: "Status",
          options: [
            { label: "Aberto", value: "Aberto" },
            { label: "Aprovado", value: "Aprovado" },
            { label: "Cancelado", value: "Cancelado" },
            { label: "Vencido", value: "Vencido" },
          ],
        },
        { kind: "textarea", name: "observacoes", label: "Observações" },
      ]}
      columns={[
        { key: "id", header: "Nº" },
        { key: "cliente_nome", header: "Cliente" },
        { key: "data", header: "Data" },
        {
          key: "valor_total",
          header: "Total",
          render: (v: any) =>
            Number(v.valor_total).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
        },
        { key: "status", header: "Status" },
      ]}
    />
  );
}

"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { vendaRapidaSchema, VendaRapidaInput } from "@/lib/crud/schemas";

const columns = [
  { accessorKey: "data", header: "Data" },
  { accessorKey: "cliente_nome", header: "Cliente" },
  { 
    accessorKey: "valor_total", 
    header: "Total",
    cell: ({ row }: any) => `R$ ${row.getValue("valor_total").toFixed(2)}`
  },
  { accessorKey: "forma_pagamento", header: "Pagamento" },
  { accessorKey: "vendedor_nome", header: "Vendedor" },
];

const fields = [
  { name: "cliente_nome", label: "Cliente", placeholder: "Cliente Consumidor" },
  { name: "vendedor_nome", label: "Vendedor", placeholder: "Nome do Vendedor" },
  { name: "valor_bruto", label: "Valor Bruto", type: "number" as const },
  { name: "desconto", label: "Desconto", type: "number" as const },
  { name: "valor_total", label: "Valor Total", type: "number" as const },
  { 
    name: "forma_pagamento", 
    label: "Forma de Pagamento", 
    type: "select" as const,
    options: [
      { label: "Dinheiro", value: "Dinheiro" },
      { label: "Cartão de Crédito", value: "Crédito" },
      { label: "Cartão de Débito", value: "Débito" },
      { label: "PIX", value: "PIX" },
    ]
  },
  { name: "data", label: "Data da Venda", type: "date" as const },
];

export default function VendaRapidaPage() {
  return (
    <ResourcePage<VendaRapidaInput>
      title="Venda Rápida (PDV)"
      resource="vendas/venda-rapida"
      schema={vendaRapidaSchema}
      columns={columns}
      fields={fields}
      defaultValues={{
        cliente_nome: "Cliente Consumidor",
        valor_bruto: 0,
        desconto: 0,
        valor_total: 0,
        forma_pagamento: "Dinheiro",
        data: new Date().toISOString().split("T")[0],
      }}
    />
  );
}

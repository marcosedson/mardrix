"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { z } from "zod";

const vendaSchema = z.object({
  id: z.string().optional(),
  cliente_id: z.string().min(1, "Selecione o cliente"),
  data_venda: z.string().min(10),
  valor_total: z.coerce.number().min(0),
  status: z.enum(["Orcamento", "Finalizada", "Cancelada"]).default("Finalizada"),
  forma_pagamento: z.string().optional(),
});

type Venda = z.infer<typeof vendaSchema> & { id: string };

export default function VendasPage() {
  return (
    <ResourcePage<Venda, typeof vendaSchema>
      title="Vendas"
      resource="vendas"
      schema={vendaSchema}
      defaultValues={{ 
        cliente_id: "", 
        data_venda: new Date().toISOString().split('T')[0], 
        valor_total: 0, 
        status: "Finalizada",
        forma_pagamento: "Dinheiro"
      }}
      fields={[
        { name: "cliente_id", label: "Cliente", placeholder: "Selecione o cliente" },
        { name: "data_venda", label: "Data da Venda", type: "date" },
        { name: "valor_total", label: "Valor Total (R$)", type: "number" },
        {
          kind: "select",
          name: "status",
          label: "Status da Venda",
          options: [
            { label: "Orçamento", value: "Orcamento" },
            { label: "Finalizada", value: "Finalizada" },
            { label: "Cancelada", value: "Cancelada" },
          ],
        },
        {
          kind: "select",
          name: "forma_pagamento",
          label: "Forma de Pagamento",
          options: [
            { label: "Dinheiro", value: "Dinheiro" },
            { label: "Cartão de Crédito", value: "Cartao_Credito" },
            { label: "Cartão de Débito", value: "Cartao_Debito" },
            { label: "Pix", value: "Pix" },
            { label: "Boleto", value: "Boleto" },
          ],
        },
      ]}
      columns={[
        { key: "cliente_id", header: "Cliente" },
        { key: "data_venda", header: "Data" },
        { 
          key: "valor_total", 
          header: "Total",
          render: (v) => Number(v.valor_total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        },
        { key: "status", header: "Status" },
      ]}
    />
  );
}

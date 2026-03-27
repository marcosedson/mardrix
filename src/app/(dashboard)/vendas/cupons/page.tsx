"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { cupomSchema, CupomInput } from "@/lib/crud/schemas";

const columns = [
  { accessorKey: "codigo", header: "Código" },
  { accessorKey: "tipo", header: "Tipo" },
  { 
    accessorKey: "valor", 
    header: "Valor",
    cell: ({ row }: any) => {
      const valor = row.getValue("valor");
      const tipo = row.getValue("tipo");
      return tipo === "Percentual" ? `${valor}%` : `R$ ${valor.toFixed(2)}`;
    }
  },
  { accessorKey: "uso_atual", header: "Usos" },
  { accessorKey: "uso_maximo", header: "Limite" },
  { accessorKey: "validade_fim", header: "Vencimento" },
  { 
    accessorKey: "ativo", 
    header: "Status",
    cell: ({ row }: any) => (
      <span className={`px-2 py-1 rounded-full text-xs ${row.getValue("ativo") ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
        {row.getValue("ativo") ? "Ativo" : "Inativo"}
      </span>
    )
  },
];

const fields = [
  { name: "codigo", label: "Código do Cupom", placeholder: "Ex: VERAO2026" },
  { 
    name: "tipo", 
    label: "Tipo de Desconto", 
    type: "select" as const,
    options: [
      { label: "Percentual (%)", value: "Percentual" },
      { label: "Valor Fixo (R$)", value: "Fixo" },
    ]
  },
  { name: "valor", label: "Valor", type: "number" as const },
  { name: "validade_inicio", label: "Início da Validade", type: "date" as const },
  { name: "validade_fim", label: "Fim da Validade", type: "date" as const },
  { name: "uso_maximo", label: "Limite de Usos", type: "number" as const },
  { name: "ativo", label: "Ativo", type: "checkbox" as const },
];

export default function CuponsPage() {
  return (
    <ResourcePage<CupomInput>
      title="Cupons de Desconto"
      resource="vendas/cupons"
      schema={cupomSchema}
      columns={columns}
      fields={fields}
      defaultValues={{
        codigo: "",
        tipo: "Percentual",
        valor: 0,
        ativo: true,
      }}
    />
  );
}

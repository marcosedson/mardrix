"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { devolucaoSchema, DevolucaoInput } from "@/lib/crud/schemas";

const columns = [
  { accessorKey: "cliente_nome", header: "Cliente" },
  { accessorKey: "data", header: "Data" },
  { accessorKey: "motivo", header: "Motivo" },
  { 
    accessorKey: "valor_estorno", 
    header: "Estorno",
    cell: ({ row }: any) => `R$ ${row.getValue("valor_estorno").toFixed(2)}`
  },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("status");
      const colors: any = {
        "Pendente": "bg-yellow-500/20 text-yellow-500",
        "Aprovada": "bg-green-500/20 text-green-500",
        "Rejeitada": "bg-red-500/20 text-red-500",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${colors[status]}`}>
          {status}
        </span>
      );
    }
  },
];

const fields = [
  { name: "cliente_nome", label: "Cliente", placeholder: "Nome do Cliente" },
  { name: "venda_id", label: "ID da Venda (Opcional)", placeholder: "Referência da venda" },
  { name: "data", label: "Data da Devolução", type: "date" as const },
  { name: "motivo", label: "Motivo da Devolução", type: "textarea" as const },
  { name: "valor_estorno", label: "Valor do Estorno", type: "number" as const },
  { 
    name: "status", 
    label: "Status", 
    type: "select" as const,
    options: [
      { label: "Pendente", value: "Pendente" },
      { label: "Aprovada", value: "Aprovada" },
      { label: "Rejeitada", value: "Rejeitada" },
    ]
  },
];

export default function DevolucoesPage() {
  return (
    <ResourcePage<DevolucaoInput>
      title="Devoluções e Trocas"
      resource="vendas/devolucoes"
      schema={devolucaoSchema}
      columns={columns}
      fields={fields}
      defaultValues={{
        cliente_nome: "",
        motivo: "",
        valor_estorno: 0,
        status: "Pendente",
        data: new Date().toISOString().split("T")[0],
      }}
    />
  );
}

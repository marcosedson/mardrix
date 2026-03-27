"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { consignadoSchema, ConsignadoInput } from "@/lib/crud/schemas";

const columns = [
  { accessorKey: "cliente_nome", header: "Cliente" },
  { accessorKey: "data_saida", header: "Data de Saída" },
  { accessorKey: "data_acerto", header: "Previsão de Acerto" },
  { 
    accessorKey: "valor_total", 
    header: "Valor Total",
    cell: ({ row }: any) => `R$ ${row.getValue("valor_total").toFixed(2)}`
  },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("status");
      const colors: any = {
        "Aberto": "bg-blue-500/20 text-blue-500",
        "Acertado Parcial": "bg-yellow-500/20 text-yellow-500",
        "Finalizado": "bg-green-500/20 text-green-500",
        "Cancelado": "bg-red-500/20 text-red-500",
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
  { name: "data_saida", label: "Data de Saída", type: "date" as const },
  { name: "data_acerto", label: "Data de Acerto", type: "date" as const },
  { name: "valor_total", label: "Valor Estimado", type: "number" as const },
  { 
    name: "status", 
    label: "Status", 
    type: "select" as const,
    options: [
      { label: "Aberto", value: "Aberto" },
      { label: "Acertado Parcial", value: "Acertado Parcial" },
      { label: "Finalizado", value: "Finalizado" },
      { label: "Cancelado", value: "Cancelado" },
    ]
  },
  { name: "observacoes", label: "Observações", type: "textarea" as const },
];

export default function ConsignadosPage() {
  return (
    <ResourcePage<ConsignadoInput>
      title="Vendas Consignadas"
      resource="vendas/consignados"
      schema={consignadoSchema}
      columns={columns}
      fields={fields}
      defaultValues={{
        cliente_nome: "",
        data_saida: new Date().toISOString().split("T")[0],
        status: "Aberto",
        valor_total: 0,
      }}
    />
  );
}

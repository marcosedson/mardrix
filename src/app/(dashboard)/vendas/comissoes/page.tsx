"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { comissaoSchema, ComissaoInput } from "@/lib/crud/schemas";

const columns = [
  { accessorKey: "vendedor_nome", header: "Vendedor" },
  { accessorKey: "data_venda", header: "Data" },
  { 
    accessorKey: "valor_venda", 
    header: "Venda",
    cell: ({ row }: any) => `R$ ${row.getValue("valor_venda").toFixed(2)}`
  },
  { 
    accessorKey: "percentual", 
    header: "%",
    cell: ({ row }: any) => `${row.getValue("percentual")}%`
  },
  { 
    accessorKey: "valor_comissao", 
    header: "Comissão",
    cell: ({ row }: any) => `R$ ${row.getValue("valor_comissao").toFixed(2)}`
  },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("status");
      const colors: any = {
        "Pendente": "bg-yellow-500/20 text-yellow-500",
        "Pago": "bg-green-500/20 text-green-500",
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
  { name: "vendedor_nome", label: "Vendedor", placeholder: "Nome do Vendedor" },
  { name: "valor_venda", label: "Valor da Venda", type: "number" as const },
  { name: "percentual", label: "Percentual de Comissão (%)", type: "number" as const },
  { name: "valor_comissao", label: "Valor da Comissão", type: "number" as const },
  { name: "data_venda", label: "Data da Venda", type: "date" as const },
  { 
    name: "status", 
    label: "Status de Pagamento", 
    type: "select" as const,
    options: [
      { label: "Pendente", value: "Pendente" },
      { label: "Pago", value: "Pago" },
      { label: "Cancelado", value: "Cancelado" },
    ]
  },
];

export default function ComissoesPage() {
  return (
    <ResourcePage<ComissaoInput>
      title="Gestão de Comissões"
      resource="vendas/comissoes"
      schema={comissaoSchema}
      columns={columns}
      fields={fields}
      defaultValues={{
        vendedor_nome: "",
        valor_venda: 0,
        percentual: 0,
        valor_comissao: 0,
        status: "Pendente",
      }}
    />
  );
}

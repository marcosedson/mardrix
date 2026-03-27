"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { listaPrecoSchema, ListaPrecoInput } from "@/lib/crud/schemas";

const columns = [
  { accessorKey: "nome", header: "Nome da Lista" },
  { 
    accessorKey: "percentual_ajuste", 
    header: "Ajuste",
    cell: ({ row }: any) => {
      const valor = row.getValue("percentual_ajuste");
      const tipo = row.getValue("tipo_ajuste");
      return `${tipo === "Acréscimo" ? "+" : "-"}${valor}%`;
    }
  },
  { accessorKey: "base_calculo", header: "Base de Cálculo" },
  { 
    accessorKey: "ativo", 
    header: "Status",
    cell: ({ row }: any) => (
      <span className={`px-2 py-1 rounded-full text-xs ${row.getValue("ativo") ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
        {row.getValue("ativo") ? "Ativa" : "Inativa"}
      </span>
    )
  },
];

const fields = [
  { name: "nome", label: "Nome da Lista", placeholder: "Ex: Atacado 2026" },
  { 
    name: "tipo_ajuste", 
    label: "Tipo de Ajuste", 
    type: "select" as const,
    options: [
      { label: "Acréscimo (+)", value: "Acréscimo" },
      { label: "Desconto (-)", value: "Desconto" },
    ]
  },
  { name: "percentual_ajuste", label: "Percentual de Ajuste (%)", type: "number" as const },
  { 
    name: "base_calculo", 
    label: "Base de Cálculo", 
    type: "select" as const,
    options: [
      { label: "Preço de Custo", value: "Custo" },
      { label: "Preço de Venda Base", value: "Venda" },
    ]
  },
  { name: "ativo", label: "Ativa", type: "checkbox" as const },
];

export default function ListaPrecosPage() {
  return (
    <ResourcePage<ListaPrecoInput>
      title="Listas de Preços"
      resource="vendas/lista-precos"
      schema={listaPrecoSchema}
      columns={columns}
      fields={fields}
      defaultValues={{
        nome: "",
        percentual_ajuste: 0,
        tipo_ajuste: "Acréscimo",
        base_calculo: "Venda",
        ativo: true,
      }}
    />
  );
}

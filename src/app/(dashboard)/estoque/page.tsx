"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { movimentoEstoqueSchema } from "@/lib/crud/schemas";

type MovimentoEstoque = {
  id: string;
  produto_nome: string;
  tipo: "entrada" | "saida" | "ajuste";
  quantidade: number;
  created_at?: string;
  updated_at?: string;
};

export default function EstoquePage() {
  return (
    <ResourcePage<MovimentoEstoque, typeof movimentoEstoqueSchema>
      title="Estoque"
      resource="estoque"
      schema={movimentoEstoqueSchema}
      defaultValues={{ produto_nome: "", tipo: "entrada", quantidade: 1 }}
      fields={[
        { name: "produto_nome", label: "Produto" },
        {
          kind: "select",
          name: "tipo",
          label: "Tipo",
          options: [
            { value: "entrada", label: "Entrada" },
            { value: "saida", label: "Saída" },
            { value: "ajuste", label: "Ajuste" },
          ],
        },
        { name: "quantidade", label: "Quantidade", type: "number" },
      ]}
      columns={[
        { key: "produto_nome", header: "Produto" },
        {
          key: "tipo",
          header: "Tipo",
          render: (m) =>
            m.tipo === "entrada" ? "Entrada" : m.tipo === "saida" ? "Saída" : "Ajuste",
        },
        { key: "quantidade", header: "Qtd" },
      ]}
    />
  );
}

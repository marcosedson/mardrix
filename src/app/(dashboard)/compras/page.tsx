"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { compraSchema } from "@/lib/crud/schemas";

type Compra = {
  id: string;
  fornecedor_nome: string;
  total: number;
  created_at?: string;
  updated_at?: string;
};

export default function ComprasPage() {
  return (
    <ResourcePage<Compra, typeof compraSchema>
      title="Compras"
      resource="compras"
      schema={compraSchema}
      defaultValues={{ fornecedor_nome: "", total: 0 }}
      fields={[
        { name: "fornecedor_nome", label: "Fornecedor" },
        { name: "total", label: "Total", type: "number" },
      ]}
      columns={[
        { key: "fornecedor_nome", header: "Fornecedor" },
        {
          key: "total",
          header: "Total",
          render: (c) =>
            Number(c.total ?? 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
        },
      ]}
    />
  );
}

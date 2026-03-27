"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { categoriaSchema, type CategoriaInput } from "@/lib/crud/schemas";
import type { CrudField } from "@/components/crud/crud-dialog";

const fields: CrudField[] = [
  { name: "nome", label: "Nome da Categoria", type: "text", placeholder: "Ex: Eletrônicos" },
  { name: "descricao", label: "Descrição", type: "textarea", placeholder: "Breve descrição da categoria..." },
  { name: "ativo", label: "Ativa", type: "checkbox" },
];

const columns = [
  { key: "nome" as keyof CategoriaInput, header: "Nome" },
  { key: "descricao" as keyof CategoriaInput, header: "Descrição" },
  { 
    key: "ativo" as keyof CategoriaInput, 
    header: "Status",
    render: (item: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.ativo ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
        {item.ativo ? 'Ativo' : 'Inativo'}
      </span>
    )
  },
];

export default function CategoriasPage() {
  return (
    <ResourcePage
      title="Categorias"
      resource="categorias"
      schema={categoriaSchema}
      fields={fields}
      columns={columns}
      defaultValues={{
        nome: "",
        descricao: "",
        ativo: true,
      }}
    />
  );
}

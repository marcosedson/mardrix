"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { marcaSchema, type MarcaInput } from "@/lib/crud/schemas";
import type { CrudField } from "@/components/crud/crud-dialog";

const fields: CrudField[] = [
  { name: "nome", label: "Nome da Marca", type: "text", placeholder: "Ex: Samsung, Apple" },
  { name: "site", label: "Website", type: "text", placeholder: "https://..." },
  { name: "ativo", label: "Ativa", type: "checkbox" },
];

const columns = [
  { key: "nome" as keyof MarcaInput, header: "Nome" },
  { key: "site" as keyof MarcaInput, header: "Website" },
  { 
    key: "ativo" as keyof MarcaInput, 
    header: "Status",
    render: (item: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.ativo ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
        {item.ativo ? 'Ativo' : 'Inativo'}
      </span>
    )
  },
];

export default function MarcasPage() {
  return (
    <ResourcePage
      title="Marcas"
      resource="marcas"
      schema={marcaSchema}
      fields={fields}
      columns={columns}
      defaultValues={{
        nome: "",
        site: "",
        ativo: true,
      }}
    />
  );
}

"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { unidadeMedidaSchema, type UnidadeMedidaInput } from "@/lib/crud/schemas";
import type { CrudField } from "@/components/crud/crud-dialog";

const fields: CrudField[] = [
  { name: "sigla", label: "Sigla", type: "text", placeholder: "Ex: UN, KG, LT" },
  { name: "nome", label: "Nome por Extenso", type: "text", placeholder: "Ex: Unidade, Quilograma" },
  { name: "casas_decimais", label: "Casas Decimais", type: "number", placeholder: "2" },
];

const columns = [
  { key: "sigla" as keyof UnidadeMedidaInput, header: "Sigla" },
  { key: "nome" as keyof UnidadeMedidaInput, header: "Nome" },
  { key: "casas_decimais" as keyof UnidadeMedidaInput, header: "Decimais" },
];

export default function UnidadesPage() {
  return (
    <ResourcePage
      title="Unidades de Medida"
      resource="unidades-medida"
      schema={unidadeMedidaSchema}
      fields={fields}
      columns={columns}
      defaultValues={{
        sigla: "",
        nome: "",
        casas_decimais: 2,
      }}
    />
  );
}

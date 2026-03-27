"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { servicoSchema, type ServicoInput } from "@/lib/crud/schemas";
import type { CrudField } from "@/components/crud/crud-dialog";

const fields: CrudField[] = [
  { name: "nome", label: "Nome do Serviço", type: "text", placeholder: "Ex: Consultoria Técnica" },
  { name: "preco_venda", label: "Preço de Venda", type: "number", placeholder: "0.00" },
  { name: "codigo_servico", label: "Código do Serviço (NFS-e)", type: "text", placeholder: "Código fiscal" },
  { name: "aliquota_iss", label: "Alíquota ISS (%)", type: "number", placeholder: "0.00" },
  { name: "descricao", label: "Descrição", type: "textarea", placeholder: "Detalhes sobre o serviço..." },
  { name: "ativo", label: "Ativo", type: "checkbox" },
];

const columns = [
  { key: "nome" as keyof ServicoInput, header: "Nome" },
  { 
    key: "preco_venda" as keyof ServicoInput, 
    header: "Preço", 
    render: (item: any) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco_venda) 
  },
  { key: "codigo_servico" as keyof ServicoInput, header: "Cód. Fiscal" },
  { 
    key: "ativo" as keyof ServicoInput, 
    header: "Status",
    render: (item: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.ativo ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
        {item.ativo ? 'Ativo' : 'Inativo'}
      </span>
    )
  },
];

export default function ServicosPage() {
  return (
    <ResourcePage
      title="Serviços"
      resource="servicos"
      schema={servicoSchema}
      fields={fields}
      columns={columns}
      defaultValues={{
        nome: "",
        preco_venda: 0,
        codigo_servico: "",
        aliquota_iss: 0,
        descricao: "",
        ativo: true,
      }}
    />
  );
}

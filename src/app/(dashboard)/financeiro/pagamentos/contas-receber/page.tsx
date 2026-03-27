"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { financeiroSchema, type FinanceiroInput } from "@/lib/crud/schemas";
import type { CrudField } from "@/components/crud/crud-dialog";

const fields: CrudField[] = [
  { name: "descricao", label: "Descrição", type: "text", placeholder: "Ex: Recebimento Venda #123" },
  { name: "entidade_nome", label: "Cliente", type: "text", placeholder: "Nome do cliente" },
  { name: "valor", label: "Valor (R$)", type: "number", placeholder: "0.00" },
  { name: "vencimento", label: "Data de Vencimento", type: "text", placeholder: "AAAA-MM-DD" },
  { name: "pagamento_data", label: "Data do Recebimento", type: "text", placeholder: "AAAA-MM-DD" },
  { 
    name: "status", 
    label: "Status", 
    type: "select", 
    options: [
      { label: "Pendente", value: "pendente" },
      { label: "Recebido", value: "pago" },
      { label: "Atrasado", value: "atrasado" },
      { label: "Cancelado", value: "cancelado" },
    ] 
  },
  { name: "categoria_financeira", label: "Categoria", type: "text", placeholder: "Ex: Vendas, Serviços..." },
  { name: "metodo_pagamento", label: "Método", type: "text", placeholder: "Ex: Cartão, Pix..." },
  { name: "observacoes", label: "Observações", type: "textarea", placeholder: "Detalhes adicionais..." },
];

const columns = [
  { key: "descricao" as keyof FinanceiroInput, header: "Descrição" },
  { key: "entidade_nome" as keyof FinanceiroInput, header: "Cliente" },
  { 
    key: "valor" as keyof FinanceiroInput, 
    header: "Valor", 
    render: (item: any) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor) 
  },
  { key: "vencimento" as keyof FinanceiroInput, header: "Vencimento" },
  { 
    key: "status" as keyof FinanceiroInput, 
    header: "Status",
    render: (item: any) => {
      const colors: Record<string, string> = {
        pendente: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        pago: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        atrasado: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        cancelado: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[item.status] || colors.pendente}`}>
          {item.status === 'pago' ? 'RECEBIDO' : item.status.toUpperCase()}
        </span>
      );
    }
  },
];

export default function ContasReceberPage() {
  return (
    <ResourcePage
      title="Contas a Receber"
      resource="financeiro/recebimentos"
      schema={financeiroSchema}
      fields={fields}
      columns={columns}
      defaultValues={{
        descricao: "",
        entidade_nome: "",
        valor: 0,
        vencimento: new Date().toISOString().split('T')[0],
        status: "pendente",
        categoria_financeira: "",
        metodo_pagamento: "",
        observacoes: "",
      }}
    />
  );
}

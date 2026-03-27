"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { clienteSchema } from "@/lib/crud/schemas";
import { cn } from "@/lib/utils";

type Cliente = {
  id: string;
  nome: string;
  documento?: string;
  email?: string;
  telefone?: string;
  celular?: string;
  ativo?: boolean;
  created_at?: string;
  updated_at?: string;
};

export default function ClientesPage() {
  return (
    <ResourcePage<Cliente, typeof clienteSchema>
      title="Clientes"
      resource="clientes"
      schema={clienteSchema}
      defaultValues={{
        tipo_pessoa: "PF",
        nome: "",
        nome_fantasia: "",
        documento: "",
        inscricao_estadual: "",
        email: "",
        telefone: "",
        celular: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        observacoes: "",
        ativo: true,
      }}
      fields={[
        {
          kind: "select",
          name: "tipo_pessoa",
          label: "Tipo de Pessoa",
          options: [
            { label: "Pessoa Física", value: "PF" },
            { label: "Pessoa Jurídica", value: "PJ" },
          ],
        },
        { name: "nome", label: "Nome / Razão Social", placeholder: "Ex.: João Silva ou Empresa LTDA" },
        { name: "nome_fantasia", label: "Nome Fantasia", placeholder: "Se aplicável" },
        { name: "documento", label: "CPF / CNPJ", placeholder: "Apenas números" },
        { name: "inscricao_estadual", label: "Inscrição Estadual", placeholder: "Se aplicável" },
        { name: "email", label: "Email", placeholder: "email@exemplo.com", type: "email" },
        { name: "telefone", label: "Telefone Fixo", placeholder: "(00) 0000-0000" },
        { name: "celular", label: "Celular / WhatsApp", placeholder: "(00) 00000-0000" },
        { name: "cep", label: "CEP", placeholder: "00000-000" },
        { name: "logradouro", label: "Endereço", placeholder: "Rua, Av, etc" },
        { name: "numero", label: "Número", placeholder: "123" },
        { name: "complemento", label: "Complemento", placeholder: "Apto, Sala, etc" },
        { name: "bairro", label: "Bairro", placeholder: "" },
        { name: "cidade", label: "Cidade", placeholder: "" },
        { name: "estado", label: "UF", placeholder: "Ex.: SP" },
        { kind: "textarea", name: "observacoes", label: "Observações", placeholder: "Notas internas sobre o cliente..." },
        { kind: "checkbox", name: "ativo", label: "Cliente Ativo" },
      ]}
      columns={[
        { key: "nome", header: "Nome" },
        { key: "documento", header: "Documento" },
        { key: "email", header: "Email" },
        { key: "celular", header: "Celular" },
        {
          key: "ativo",
          header: "Status",
          render: (it: any) => (
            <span className={cn(
              "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
              it.ativo ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            )}>
              {it.ativo ? "Ativo" : "Inativo"}
            </span>
          )
        }
      ]}
    />
  );
}

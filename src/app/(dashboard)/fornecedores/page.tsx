"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { fornecedorSchema } from "@/lib/crud/schemas";
import { cn } from "@/lib/utils";

type Fornecedor = {
  id: string;
  nome: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  estado?: string;
  ativo: boolean;
};

export default function FornecedoresPage() {
  return (
    <ResourcePage<Fornecedor, typeof fornecedorSchema>
      title="Fornecedores"
      resource="fornecedores"
      schema={fornecedorSchema}
      defaultValues={{
        nome: "",
        cnpj: "",
        email: "",
        telefone: "",
      }}
      fields={[
        { name: "nome", label: "Razão Social / Nome", placeholder: "Ex.: Fornecedor de Peças LTDA" },
        { name: "cnpj", label: "CNPJ / CPF", placeholder: "Apenas números" },
        { name: "email", label: "Email Corporativo", type: "email" },
        { name: "telefone", label: "Telefone / Celular" },
      ]}
      columns={[
        { key: "nome", header: "Nome" },
        { key: "cnpj", header: "Documento" },
        { key: "email", header: "Email" },
        {
          key: "ativo" as keyof Fornecedor,
          header: "Status",
          render: (f: any) => (
            <span className={cn(
              "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
              f.ativo ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            )}>
              {f.ativo ? "Ativo" : "Inativo"}
            </span>
          ),
        },
      ]}
    />
  );
}

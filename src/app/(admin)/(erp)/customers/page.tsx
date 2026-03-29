import { Metadata } from "next";
import ResourceCrudPage from "@/modules/shared/components/ResourceCrudPage";

export const metadata: Metadata = {
  title: "Mardrix ERP | Clientes",
  description: "Gestao de clientes",
};

export default function CustomersPage() {
  return (
    <ResourceCrudPage
      pageTitle="Clientes"
      resource="customers"
      createLabel="Novo Cliente"
      columns={[
        { key: "name", label: "Nome" },
        { key: "document", label: "CPF/CNPJ" },
        { key: "phone", label: "Telefone" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "name", label: "Nome" },
        { name: "document", label: "CPF/CNPJ" },
        { name: "phone", label: "Telefone" },
        { name: "email", label: "Email", type: "email" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "active", label: "Ativo" },
            { value: "inactive", label: "Inativo" },
          ],
        },
      ]}
    />
  );
}


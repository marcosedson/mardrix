import { Metadata } from "next";
import ResourceCrudPage from "@/modules/shared/components/ResourceCrudPage";

export const metadata: Metadata = {
  title: "Mardrix ERP | Usuarios",
  description: "Gestao de usuarios",
};

export default function UsersPage() {
  return (
    <ResourceCrudPage
      pageTitle="Usuarios"
      resource="users"
      createLabel="Novo usuario"
      columns={[
        { key: "name", label: "Nome" },
        { key: "email", label: "Email" },
        { key: "profile", label: "Perfil" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "name", label: "Nome" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Senha", type: "password" },
        {
          name: "profile",
          label: "Perfil",
          type: "select",
          options: [
            { value: "Admin", label: "Admin" },
            { value: "Financeiro", label: "Financeiro" },
            { value: "Vendas", label: "Vendas" },
          ],
        },
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


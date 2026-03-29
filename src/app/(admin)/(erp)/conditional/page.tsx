import { Metadata } from "next";
import ResourceCrudPage from "@/modules/shared/components/ResourceCrudPage";

export const metadata: Metadata = {
  title: "Mardrix ERP | Condicional",
  description: "Controle de condicional para lojas de roupas",
};

export default function ConditionalPage() {
  return (
    <ResourceCrudPage
      pageTitle="Condicional"
      resource="conditional-orders"
      createLabel="Nova condicional"
      columns={[
        { key: "customer", label: "Cliente" },
        { key: "products", label: "Produtos enviados" },
        { key: "returnDate", label: "Data de retorno" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "customer", label: "Cliente" },
        { name: "products", label: "Produtos enviados" },
        { name: "returnDate", label: "Data de retorno", type: "date" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "open", label: "Em aberto" },
            { value: "finalized", label: "Finalizado" },
          ],
        },
      ]}
    />
  );
}


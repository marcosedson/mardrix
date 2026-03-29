import { Metadata } from "next";
import ResourceCrudPage from "@/modules/shared/components/ResourceCrudPage";

export const metadata: Metadata = {
  title: "Mardrix ERP | Contas a Receber",
  description: "Financeiro contas a receber",
};

export default function AccountsReceivablePage() {
  return (
    <ResourceCrudPage
      pageTitle="Contas a Receber"
      resource="accounts-receivable"
      createLabel="Nova Conta"
      showPayAction
      columns={[
        { key: "description", label: "Descricao" },
        { key: "value", label: "Valor" },
        { key: "dueDate", label: "Vencimento" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "description", label: "Descricao" },
        { name: "value", label: "Valor", type: "number" },
        { name: "dueDate", label: "Vencimento", type: "date" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "pending", label: "Pendente" },
            { value: "paid", label: "Pago" },
          ],
        },
      ]}
    />
  );
}


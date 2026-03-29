import { Metadata } from "next";
import ResourceCrudPage from "@/modules/shared/components/ResourceCrudPage";

export const metadata: Metadata = {
  title: "Mardrix ERP | Contas a Pagar",
  description: "Financeiro contas a pagar",
};

export default function AccountsPayablePage() {
  return (
    <ResourceCrudPage
      pageTitle="Contas a Pagar"
      resource="accounts-payable"
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


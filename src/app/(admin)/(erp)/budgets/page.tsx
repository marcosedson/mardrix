import { Metadata } from "next";
import SalesOrderPage from "@/modules/sales/components/SalesOrderPage";

export const metadata: Metadata = {
  title: "Mardrix ERP | Orcamentos",
  description: "Orcamentos de venda",
};

export default function BudgetsPage() {
  return <SalesOrderPage resource="budgets" pageTitle="Orcamentos" finalizeLabel="Salvar orcamento" />;
}


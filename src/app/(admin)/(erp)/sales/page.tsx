import { Metadata } from "next";
import SalesOrderPage from "@/modules/sales/components/SalesOrderPage";

export const metadata: Metadata = {
  title: "Mardrix ERP | Vendas",
  description: "Pedido de venda",
};

export default function SalesPage() {
  return <SalesOrderPage resource="sales-orders" pageTitle="Pedido de Venda" finalizeLabel="Finalizar pedido" />;
}


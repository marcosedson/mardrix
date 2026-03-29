import { Metadata } from "next";
import ResourceCrudPage from "@/modules/shared/components/ResourceCrudPage";

export const metadata: Metadata = {
  title: "Mardrix ERP | Produtos",
  description: "Gestao de produtos",
};

export default function ProductsPage() {
  return (
    <ResourceCrudPage
      pageTitle="Produtos"
      resource="products"
      createLabel="Novo Produto"
      columns={[
        { key: "name", label: "Nome" },
        { key: "sku", label: "SKU" },
        { key: "salePrice", label: "Preco venda" },
        { key: "stock", label: "Estoque" },
        { key: "status", label: "Status" },
      ]}
      fields={[
        { name: "name", label: "Nome" },
        { name: "sku", label: "SKU" },
        { name: "barcode", label: "Codigo de barras" },
        { name: "costPrice", label: "Preco custo", type: "number" },
        { name: "salePrice", label: "Preco venda", type: "number" },
        { name: "stock", label: "Estoque", type: "number" },
        { name: "category", label: "Categoria" },
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


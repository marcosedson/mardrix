"use client";

import ComponentCard from "@/components/common/ComponentCard";
import DataTable from "@/components/common/DataTable";
import ErrorState from "@/components/common/ErrorState";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SkeletonTable from "@/components/common/SkeletonTable";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { useResource } from "@/hooks/useResource";
import React, { useMemo, useState } from "react";

interface SalesOrderPageProps {
  resource: "sales-orders" | "budgets";
  pageTitle: string;
  finalizeLabel: string;
}

export default function SalesOrderPage({
  resource,
  pageTitle,
  finalizeLabel,
}: SalesOrderPageProps) {
  const customers = useResource<Record<string, unknown> & { id: string }>("customers", 100);
  const products = useResource<Record<string, unknown> & { id: string }>("products", 100);
  const orders = useResource<Record<string, unknown> & { id: string; status?: string }>(resource);

  const [customer, setCustomer] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const selectedProduct = useMemo(
    () => products.items.find((item) => item.id === productId),
    [products.items, productId],
  );

  const total = Number(selectedProduct?.salePrice ?? 0) * quantity;

  const handleCreate = async () => {
    if (!customer || !selectedProduct) {
      return;
    }

    await orders.createItem({
      customer,
      status: resource === "budgets" ? "draft" : "open",
      items: [
        {
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          quantity,
          unitPrice: selectedProduct.salePrice,
        },
      ],
      total,
    });

    setProductId("");
    setQuantity(1);
  };

  if (orders.loading) {
    return <SkeletonTable rows={8} />;
  }

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle={pageTitle} />

      <ComponentCard title={pageTitle}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <Label>Cliente</Label>
            <Select
              key={`customer-${customer}`}
              options={customers.items.map((item) => ({
                value: String(item.name ?? ""),
                label: String(item.name ?? ""),
              }))}
              placeholder="Selecione o cliente"
              onChange={setCustomer}
              defaultValue={customer}
            />
          </div>

          <div>
            <Label>Produto</Label>
            <Select
              key={`product-${productId}`}
              options={products.items.map((item) => ({
                value: item.id,
                label: `${String(item.name ?? "Produto")} (${String(item.salePrice ?? 0)})`,
              }))}
              placeholder="Selecione o produto"
              onChange={setProductId}
              defaultValue={productId}
            />
          </div>

          <div>
            <Label>Quantidade</Label>
            <input
              type="number"
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value || 1))}
              min={1}
            />
          </div>

          <div>
            <Label>Total automatico</Label>
            <div className="h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-300">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(total)}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleCreate}>{finalizeLabel}</Button>
        </div>
      </ComponentCard>

      {orders.error && <ErrorState message={orders.error} onRetry={orders.refresh} />}

      <ComponentCard title="Pedidos recentes">
        <DataTable
          columns={[
            { key: "customer", label: "Cliente" },
            { key: "total", label: "Total" },
            { key: "status", label: "Status" },
          ]}
          rows={orders.items}
          page={orders.page}
          pageSize={orders.pageSize}
          total={orders.total}
          onPageChange={orders.setPage}
          actions={(row) => (
            <Button size="sm" variant="outline" onClick={() => orders.updateItem(row.id, { status: "finalized" })}>
              Finalizar
            </Button>
          )}
        />
      </ComponentCard>
    </div>
  );
}


"use client";

import FormWrapper from "@/components/common/FormWrapper";
import LoadingState from "@/components/common/LoadingState";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/erp";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { items, loading, updateItem } = useProducts();
  const [state, setState] = useState<Partial<Product>>({ status: "active" });

  const selected = useMemo(() => items.find((item) => item.id === id), [items, id]);

  useEffect(() => {
    if (selected) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(selected);
    }
  }, [selected]);

  const onSubmit = async () => {
    const updated = await updateItem(id, state as Record<string, unknown>);
    if (updated) {
      router.push("/products");
    }
  };

  if (loading) {
    return <LoadingState label="Carregando produto" />;
  }

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Editar Produto" />
      <FormWrapper title="Editar Produto" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>Nome</Label>
            <Input
              defaultValue={String((state.name ?? "") || "")}
              onChange={(e) => setState((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div>
            <Label>SKU</Label>
            <Input onChange={(e) => setState((p) => ({ ...p, sku: e.target.value }))} />
          </div>
          <div>
            <Label>Codigo de barras</Label>
            <Input onChange={(e) => setState((p) => ({ ...p, barcode: e.target.value }))} />
          </div>
          <div>
            <Label>Preco custo</Label>
            <Input type="number" onChange={(e) => setState((p) => ({ ...p, costPrice: Number(e.target.value) }))} />
          </div>
          <div>
            <Label>Preco venda</Label>
            <Input type="number" onChange={(e) => setState((p) => ({ ...p, salePrice: Number(e.target.value) }))} />
          </div>
          <div>
            <Label>Estoque</Label>
            <Input type="number" onChange={(e) => setState((p) => ({ ...p, stock: Number(e.target.value) }))} />
          </div>
          <div>
            <Label>Categoria</Label>
            <Input onChange={(e) => setState((p) => ({ ...p, category: e.target.value }))} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Salvar</Button>
        </div>
      </FormWrapper>
    </div>
  );
}


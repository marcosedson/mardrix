"use client";

import FormWrapper from "@/components/common/FormWrapper";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { useProducts } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function NewProductPage() {
  const router = useRouter();
  const { createItem } = useProducts();
  const [form, setForm] = useState({
    name: "",
    sku: "",
    barcode: "",
    costPrice: 0,
    salePrice: 0,
    stock: 0,
    category: "",
  });

  const onSubmit = async () => {
    const created = await createItem({ ...form, status: "active" });
    if (created) {
      router.push("/products");
    }
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Novo Produto" />
      <FormWrapper title="Criar Produto" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>Nome</Label>
            <Input onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          </div>
          <div>
            <Label>SKU</Label>
            <Input onChange={(e) => setForm((p) => ({ ...p, sku: e.target.value }))} />
          </div>
          <div>
            <Label>Codigo de barras</Label>
            <Input onChange={(e) => setForm((p) => ({ ...p, barcode: e.target.value }))} />
          </div>
          <div>
            <Label>Preco custo</Label>
            <Input type="number" onChange={(e) => setForm((p) => ({ ...p, costPrice: Number(e.target.value) }))} />
          </div>
          <div>
            <Label>Preco venda</Label>
            <Input type="number" onChange={(e) => setForm((p) => ({ ...p, salePrice: Number(e.target.value) }))} />
          </div>
          <div>
            <Label>Estoque</Label>
            <Input type="number" onChange={(e) => setForm((p) => ({ ...p, stock: Number(e.target.value) }))} />
          </div>
          <div>
            <Label>Categoria</Label>
            <Input onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Salvar</Button>
        </div>
      </FormWrapper>
    </div>
  );
}


"use client";

import ComponentCard from "@/components/common/ComponentCard";
import FormWrapper from "@/components/common/FormWrapper";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import React, { useState } from "react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const onSubmit = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Configuracoes" />

      <FormWrapper title="Dados da empresa" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>Razao social</Label>
            <Input defaultValue="Mardrix SaaS LTDA" />
          </div>
          <div>
            <Label>CNPJ</Label>
            <Input defaultValue="12.345.678/0001-00" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" defaultValue="contato@mardrix.com" />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input defaultValue="(11) 4000-1010" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Salvar</Button>
        </div>
      </FormWrapper>

      <ComponentCard title="Preferencias basicas">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-4 text-sm dark:border-gray-700">
            Notificacao de vendas: Ativa
          </div>
          <div className="rounded-lg border border-gray-200 p-4 text-sm dark:border-gray-700">
            Timezone: America/Sao_Paulo
          </div>
        </div>
        {saved && <p className="text-sm text-success-600">Configuracoes salvas com sucesso.</p>}
      </ComponentCard>
    </div>
  );
}


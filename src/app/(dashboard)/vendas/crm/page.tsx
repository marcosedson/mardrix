"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { crmSchema } from "@/lib/crud/schemas";

export default function CrmPage() {
  return (
    <ResourcePage
      title="CRM - Atendimento"
      resource="crm"
      schema={crmSchema}
      defaultValues={{
        cliente_nome: "",
        tipo_interacao: "Contato",
        data: new Date().toISOString().split("T")[0],
        descricao: "",
        status_lead: "Morno",
      }}
      fields={[
        { name: "cliente_nome", label: "Cliente", placeholder: "Selecione o cliente" },
        {
          kind: "select",
          name: "tipo_interacao",
          label: "Tipo de Interação",
          options: [
            { label: "Contato", value: "Contato" },
            { label: "Reunião", value: "Reunião" },
            { label: "Proposta", value: "Proposta" },
            { label: "Pós-venda", value: "Pós-venda" },
          ],
        },
        { name: "data", label: "Data", type: "date" },
        {
          kind: "select",
          name: "status_lead",
          label: "Status do Lead",
          options: [
            { label: "Frio", value: "Frio" },
            { label: "Morno", value: "Morno" },
            { label: "Quente", value: "Quente" },
            { label: "Cliente", value: "Cliente" },
          ],
        },
        { kind: "textarea", name: "descricao", label: "O que foi conversado?" },
      ]}
      columns={[
        { key: "data", header: "Data" },
        { key: "cliente_nome", header: "Cliente" },
        { key: "tipo_interacao", header: "Tipo" },
        { key: "status_lead", header: "Lead" },
      ]}
    />
  );
}

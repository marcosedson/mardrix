import { Metadata } from "next";
import ResourceCrudPage from "@/modules/shared/components/ResourceCrudPage";

export const metadata: Metadata = {
  title: "Mardrix ERP | Ordem de Servico",
  description: "Controle de ordens de servico",
};

export default function ServicesPage() {
  return (
    <ResourceCrudPage
      pageTitle="Ordem de Servico"
      resource="service-orders"
      createLabel="Nova O.S."
      columns={[
        { key: "customer", label: "Cliente" },
        { key: "description", label: "Descricao" },
        { key: "status", label: "Status" },
        { key: "technician", label: "Tecnico" },
      ]}
      fields={[
        { name: "customer", label: "Cliente" },
        { name: "description", label: "Descricao" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "open", label: "Em aberto" },
            { value: "pending", label: "Pendente" },
            { value: "finalized", label: "Finalizado" },
          ],
        },
        { name: "technician", label: "Tecnico responsavel" },
      ]}
    />
  );
}


"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { pedidoSchema } from "@/lib/crud/schemas";

export default function PedidosPage() {
  return (
    <ResourcePage
      title="Pedidos"
      resource="pedidos"
      schema={pedidoSchema}
      defaultValues={{
        cliente_nome: "",
        data: new Date().toISOString().split("T")[0],
        valor_total: 0,
        status: "Pendente",
        pagamento_status: "Pendente",
      }}
      fields={[
        { name: "cliente_nome", label: "Cliente", placeholder: "Selecione o cliente" },
        { name: "data", label: "Data", type: "date" },
        { name: "valor_total", label: "Valor Total (R$)", type: "number" },
        {
          kind: "select",
          name: "status",
          label: "Status do Pedido",
          options: [
            { label: "Pendente", value: "Pendente" },
            { label: "Em Separação", value: "Em Separação" },
            { label: "Enviado", value: "Enviado" },
            { label: "Entregue", value: "Entregue" },
            { label: "Cancelado", value: "Cancelado" },
          ],
        },
        {
          kind: "select",
          name: "pagamento_status",
          label: "Status do Pagamento",
          options: [
            { label: "Pendente", value: "Pendente" },
            { label: "Parcial", value: "Parcial" },
            { label: "Pago", value: "Pago" },
            { label: "Extornado", value: "Extornado" },
          ],
        },
      ]}
      columns={[
        { key: "id", header: "Pedido" },
        { key: "cliente_nome", header: "Cliente" },
        { key: "data", header: "Data" },
        {
          key: "valor_total",
          header: "Total",
          render: (v: any) =>
            Number(v.valor_total).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
        },
        { key: "status", header: "Status" },
      ]}
    />
  );
}

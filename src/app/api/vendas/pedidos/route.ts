import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

export type Pedido = {
  id: string;
  cliente_nome: string;
  data: string;
  valor_total: number;
  status: string;
  pagamento_status: string;
  created_at: string;
  updated_at: string;
};

seedEntities<Pedido>("pedidos", [
  {
    id: "ped_1",
    cliente_nome: "Maria Oliveira",
    data: new Date().toISOString().split("T")[0],
    valor_total: 250.0,
    status: "Pendente",
    pagamento_status: "Pendente",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/vendas/pedidos");
  if (proxied) return proxied;
  return listMock(listEntities<Pedido>("pedidos"));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const created = createEntity<Pedido>("pedidos", {
    cliente_nome: body.cliente_nome,
    data: body.data,
    valor_total: Number(body.valor_total || 0),
    status: body.status,
    pagamento_status: body.pagamento_status,
  } as any);
  return itemMock(created, 201);
}

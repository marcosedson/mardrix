import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

export type Orcamento = {
  id: string;
  cliente_nome: string;
  data: string;
  validade: string;
  valor_total: number;
  status: string;
  created_at: string;
  updated_at: string;
};

seedEntities<Orcamento>("orcamentos", [
  {
    id: "orc_1",
    cliente_nome: "Cliente de Teste",
    data: new Date().toISOString().split("T")[0],
    validade: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    valor_total: 1500.0,
    status: "Aberto",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/vendas/orcamentos");
  if (proxied) return proxied;
  return listMock(listEntities<Orcamento>("orcamentos"));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const created = createEntity<Orcamento>("orcamentos", {
    cliente_nome: body.cliente_nome,
    data: body.data,
    validade: body.validade,
    valor_total: Number(body.valor_total || 0),
    status: body.status,
  } as any);
  return itemMock(created, 201);
}

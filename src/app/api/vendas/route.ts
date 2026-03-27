import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

export type Venda = {
  id: string;
  cliente_nome: string;
  total: number;
  created_at: string;
  updated_at: string;
};

seedEntities<Venda>("vendas", [
  {
    id: "ven_1",
    cliente_nome: "Cliente Exemplo",
    total: 99.9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/vendas");
  if (proxied) return proxied;
  return listMock(listEntities<Venda>("vendas"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/vendas");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<Venda>("vendas", {
    cliente_nome: String(body?.cliente_nome ?? ""),
    total: Number(body?.total ?? 0),
  } as unknown as Omit<Venda, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

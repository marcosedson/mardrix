import { maybeProxy, notFoundMock, okMock, parseIdFromUrl, itemMock } from "@/lib/crud/route-helpers";
import { deleteEntity, listEntities, seedEntities, updateEntity } from "@/lib/crud/store";

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
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/vendas/" + id);
  if (proxied) return proxied;

  const item = listEntities<Venda>("vendas").find((x) => x.id === id);
  if (!item) return notFoundMock();
  return itemMock(item);
}

export async function PUT(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/vendas/" + id);
  if (proxied) return proxied;
  const body = await req.json().catch(() => ({}));
  const updated = updateEntity<Venda>("vendas", id, body);
  if (!updated) return notFoundMock();
  return itemMock(updated);
}

export async function DELETE(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/vendas/" + id);
  if (proxied) return proxied;

  const ok = deleteEntity<Venda>("vendas", id);
  if (!ok) return notFoundMock();
  return okMock({ ok: true, source: "mock" }, 200);
}


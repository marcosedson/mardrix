import { maybeProxy, notFoundMock, okMock, parseIdFromUrl, itemMock } from "@/lib/crud/route-helpers";
import { deleteEntity, listEntities, seedEntities, updateEntity } from "@/lib/crud/store";

export type Compra = {
  id: string;
  fornecedor_nome: string;
  total: number;
  created_at: string;
  updated_at: string;
};

seedEntities<Compra>("compras", [
  {
    id: "com_1",
    fornecedor_nome: "Fornecedor Exemplo",
    total: 120.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/compras/" + id);
  if (proxied) return proxied;

  const item = listEntities<Compra>("compras").find((x) => x.id === id);
  if (!item) return notFoundMock();
  return itemMock(item);
}

export async function PUT(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/compras/" + id);
  if (proxied) return proxied;
  const body = await req.json().catch(() => ({}));
  const updated = updateEntity<Compra>("compras", id, body);
  if (!updated) return notFoundMock();
  return itemMock(updated);
}

export async function DELETE(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/compras/" + id);
  if (proxied) return proxied;

  const ok = deleteEntity<Compra>("compras", id);
  if (!ok) return notFoundMock();
  return okMock({ ok: true, source: "mock" }, 200);
}


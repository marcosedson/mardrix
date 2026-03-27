import { maybeProxy, notFoundMock, okMock, parseIdFromUrl, itemMock } from "@/lib/crud/route-helpers";
import { deleteEntity, listEntities, seedEntities, updateEntity } from "@/lib/crud/store";

export type Relatorio = {
  id: string;
  nome: string;
  formato: "pdf" | "xlsx";
  created_at: string;
  updated_at: string;
};

seedEntities<Relatorio>("relatorios", [
  {
    id: "rel_1",
    nome: "Vendas do mês",
    formato: "pdf",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/relatorios/" + id);
  if (proxied) return proxied;

  const item = listEntities<Relatorio>("relatorios").find((x) => x.id === id);
  if (!item) return notFoundMock();
  return itemMock(item);
}

export async function PUT(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/relatorios/" + id);
  if (proxied) return proxied;
  const body = await req.json().catch(() => ({}));
  const updated = updateEntity<Relatorio>("relatorios", id, body);
  if (!updated) return notFoundMock();
  return itemMock(updated);
}

export async function DELETE(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/relatorios/" + id);
  if (proxied) return proxied;
  const ok = deleteEntity<Relatorio>("relatorios", id);
  if (!ok) return notFoundMock();
  return okMock({ ok: true, source: "mock" }, 200);
}


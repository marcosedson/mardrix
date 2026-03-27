import { maybeProxy, notFoundMock, okMock, parseIdFromUrl, itemMock } from "@/lib/crud/route-helpers";
import { deleteEntity, listEntities, seedEntities, updateEntity } from "@/lib/crud/store";

export type MovimentoEstoque = {
  id: string;
  produto_nome: string;
  tipo: "entrada" | "saida" | "ajuste";
  quantidade: number;
  created_at: string;
  updated_at: string;
};

seedEntities<MovimentoEstoque>("estoque", [
  {
    id: "mov_1",
    produto_nome: "Produto Exemplo",
    tipo: "entrada",
    quantidade: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/estoque/" + id);
  if (proxied) return proxied;

  const item = listEntities<MovimentoEstoque>("estoque").find((x) => x.id === id);
  if (!item) return notFoundMock();
  return itemMock(item);
}

export async function PUT(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/estoque/" + id);
  if (proxied) return proxied;
  const body = await req.json().catch(() => ({}));
  const updated = updateEntity<MovimentoEstoque>("estoque", id, body);
  if (!updated) return notFoundMock();
  return itemMock(updated);
}

export async function DELETE(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/estoque/" + id);
  if (proxied) return proxied;
  const ok = deleteEntity<MovimentoEstoque>("estoque", id);
  if (!ok) return notFoundMock();
  return okMock({ ok: true, source: "mock" }, 200);
}


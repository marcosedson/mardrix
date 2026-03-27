import { maybeProxy, notFoundMock, okMock, parseIdFromUrl, itemMock } from "@/lib/crud/route-helpers";
import { listEntities, seedEntities, updateEntity, deleteEntity } from "@/lib/crud/store";

export type Produto = {
  id: string;
  nome: string;
  sku?: string;
  codigo_barras?: string;
  preco_venda: number;
  ativo: boolean;
  estoque_atual: number;
  estoque_minimo: number;
  created_at: string;
  updated_at: string;
};

seedEntities<Produto>("produtos", [
  {
    id: "prod_1",
    nome: "Produto Exemplo",
    sku: "SKU-001",
    codigo_barras: "",
    preco_venda: 19.9,
    ativo: true,
    estoque_atual: 10,
    estoque_minimo: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/produtos/" + id);
  if (proxied) return proxied;

  const item = listEntities<Produto>("produtos").find((c) => c.id === id);
  if (!item) return notFoundMock();
  return itemMock(item);
}

export async function PUT(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/produtos/" + id);
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const updated = updateEntity<Produto>("produtos", id, body);
  if (!updated) return notFoundMock();
  return itemMock(updated);
}

export async function DELETE(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/produtos/" + id);
  if (proxied) return proxied;

  const ok = deleteEntity<Produto>("produtos", id);
  if (!ok) return notFoundMock();
  return okMock({ ok: true, source: "mock" }, 200);
}


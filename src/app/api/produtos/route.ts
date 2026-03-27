import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

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
  const proxied = await maybeProxy(req, "/produtos");
  if (proxied) return proxied;
  return listMock(listEntities<Produto>("produtos"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/produtos");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<Produto>("produtos", {
    nome: String(body?.nome ?? ""),
    sku: body?.sku ? String(body.sku) : "",
    codigo_barras: body?.codigo_barras ? String(body.codigo_barras) : "",
    preco_venda: Number(body?.preco_venda ?? 0),
    ativo: Boolean(body?.ativo ?? true),
    estoque_atual: Number(body?.estoque_atual ?? 0),
    estoque_minimo: Number(body?.estoque_minimo ?? 0),
  } as unknown as Omit<Produto, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

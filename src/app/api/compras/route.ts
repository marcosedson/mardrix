import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

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
  const proxied = await maybeProxy(req, "/compras");
  if (proxied) return proxied;
  return listMock(listEntities<Compra>("compras"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/compras");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<Compra>("compras", {
    fornecedor_nome: String(body?.fornecedor_nome ?? ""),
    total: Number(body?.total ?? 0),
  } as unknown as Omit<Compra, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

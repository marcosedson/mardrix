import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

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
  const proxied = await maybeProxy(req, "/estoque");
  if (proxied) return proxied;
  return listMock(listEntities<MovimentoEstoque>("estoque"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/estoque");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<MovimentoEstoque>("estoque", {
    produto_nome: String(body?.produto_nome ?? ""),
    tipo: (body?.tipo ?? "entrada") as MovimentoEstoque["tipo"],
    quantidade: Number(body?.quantidade ?? 1),
  } as unknown as Omit<MovimentoEstoque, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

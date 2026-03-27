import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

export type Categoria = {
  id: string;
  nome: string;
  descricao?: string;
  ativa: boolean;
  created_at: string;
  updated_at: string;
};

seedEntities<Categoria>("categorias", [
  {
    id: "cat_1",
    nome: "Geral",
    descricao: "Categoria padrão",
    ativa: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/categorias");
  if (proxied) return proxied;
  return listMock(listEntities<Categoria>("categorias"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/categorias");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<Categoria>("categorias", {
    nome: String(body?.nome ?? ""),
    descricao: body?.descricao ? String(body.descricao) : "",
    ativa: Boolean(body?.ativa ?? true),
  } as unknown as Omit<Categoria, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

export type Unidade = {
  id: string;
  sigla: string;
  nome: string;
  created_at: string;
  updated_at: string;
};

seedEntities<Unidade>("unidades", [
  {
    id: "un_1",
    sigla: "UN",
    nome: "Unidade",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "un_2",
    sigla: "KG",
    nome: "Quilograma",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/unidades");
  if (proxied) return proxied;
  return listMock(listEntities<Unidade>("unidades"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/unidades");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<Unidade>("unidades", {
    sigla: String(body?.sigla ?? ""),
    nome: String(body?.nome ?? ""),
  } as unknown as Omit<Unidade, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

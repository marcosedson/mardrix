import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

export type Marca = {
  id: string;
  nome: string;
  fabricante?: string;
  site?: string;
  created_at: string;
  updated_at: string;
};

seedEntities<Marca>("marcas", [
  {
    id: "m_1",
    nome: "Mardrix Premium",
    fabricante: "Mardrix Corp",
    site: "https://mardrix.local",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/marcas");
  if (proxied) return proxied;
  return listMock(listEntities<Marca>("marcas"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/marcas");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<Marca>("marcas", {
    nome: String(body?.nome ?? ""),
    fabricante: body?.fabricante ? String(body.fabricante) : "",
    site: body?.site ? String(body.site) : "",
  } as unknown as Omit<Marca, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

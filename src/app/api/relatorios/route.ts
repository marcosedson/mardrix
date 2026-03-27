import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

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
  const proxied = await maybeProxy(req, "/relatorios");
  if (proxied) return proxied;
  return listMock(listEntities<Relatorio>("relatorios"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/relatorios");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<Relatorio>("relatorios", {
    nome: String(body?.nome ?? ""),
    formato: (body?.formato ?? "pdf") as Relatorio["formato"],
  } as unknown as Omit<Relatorio, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

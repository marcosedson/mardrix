import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

export type Cliente = {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  created_at: string;
  updated_at: string;
};

seedEntities<Cliente>("clientes", [
  {
    id: "cli_1",
    nome: "Cliente Exemplo",
    email: "cliente@example.com",
    telefone: "(11) 99999-9999",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/clientes");
  if (proxied) return proxied;
  return listMock(listEntities<Cliente>("clientes"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/clientes");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<Cliente>("clientes", {
    nome: String(body?.nome ?? ""),
    email: body?.email ? String(body.email) : "",
    telefone: body?.telefone ? String(body.telefone) : "",
  } as unknown as Omit<Cliente, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

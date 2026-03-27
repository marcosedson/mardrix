import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

export type Fornecedor = {
  id: string;
  nome: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  created_at: string;
  updated_at: string;
};

seedEntities<Fornecedor>("fornecedores", [
  {
    id: "for_1",
    nome: "Fornecedor Exemplo",
    cnpj: "",
    email: "fornecedor@example.com",
    telefone: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/fornecedores");
  if (proxied) return proxied;
  return listMock(listEntities<Fornecedor>("fornecedores"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/fornecedores");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<Fornecedor>("fornecedores", {
    nome: String(body?.nome ?? ""),
    cnpj: body?.cnpj ? String(body.cnpj) : "",
    email: body?.email ? String(body.email) : "",
    telefone: body?.telefone ? String(body.telefone) : "",
  } as unknown as Omit<Fornecedor, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

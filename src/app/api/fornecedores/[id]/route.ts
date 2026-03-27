import { maybeProxy, notFoundMock, okMock, parseIdFromUrl, itemMock } from "@/lib/crud/route-helpers";
import { listEntities, seedEntities, updateEntity, deleteEntity } from "@/lib/crud/store";

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
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/fornecedores/" + id);
  if (proxied) return proxied;

  const item = listEntities<Fornecedor>("fornecedores").find((c) => c.id === id);
  if (!item) return notFoundMock();
  return itemMock(item);
}

export async function PUT(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/fornecedores/" + id);
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const updated = updateEntity<Fornecedor>("fornecedores", id, body);
  if (!updated) return notFoundMock();
  return itemMock(updated);
}

export async function DELETE(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/fornecedores/" + id);
  if (proxied) return proxied;

  const ok = deleteEntity<Fornecedor>("fornecedores", id);
  if (!ok) return notFoundMock();
  return okMock({ ok: true, source: "mock" }, 200);
}


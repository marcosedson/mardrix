import { maybeProxy, notFoundMock, okMock, parseIdFromUrl, itemMock } from "@/lib/crud/route-helpers";
import { listEntities, seedEntities, updateEntity, deleteEntity } from "@/lib/crud/store";

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
  const proxied = await maybeProxy(req, "/clientes/" + parseIdFromUrl(req));
  if (proxied) return proxied;

  const id = parseIdFromUrl(req);
  const item = listEntities<Cliente>("clientes").find((c) => c.id === id);
  if (!item) return notFoundMock();
  return itemMock(item);
}

export async function PUT(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/clientes/" + id);
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const updated = updateEntity<Cliente>("clientes", id, body);
  if (!updated) return notFoundMock();
  return itemMock(updated);
}

export async function DELETE(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/clientes/" + id);
  if (proxied) return proxied;

  const ok = deleteEntity<Cliente>("clientes", id);
  if (!ok) return notFoundMock();
  return okMock({ ok: true, source: "mock" }, 200);
}


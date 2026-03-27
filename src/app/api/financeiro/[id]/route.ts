import { maybeProxy, notFoundMock, okMock, parseIdFromUrl, itemMock } from "@/lib/crud/route-helpers";
import { deleteEntity, listEntities, seedEntities, updateEntity } from "@/lib/crud/store";

export type LancamentoFinanceiro = {
  id: string;
  descricao: string;
  tipo: "pagar" | "receber";
  valor: number;
  created_at: string;
  updated_at: string;
};

seedEntities<LancamentoFinanceiro>("financeiro", [
  {
    id: "fin_1",
    descricao: "Conta de luz",
    tipo: "pagar",
    valor: 250.0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/financeiro/" + id);
  if (proxied) return proxied;

  const item = listEntities<LancamentoFinanceiro>("financeiro").find((x) => x.id === id);
  if (!item) return notFoundMock();
  return itemMock(item);
}

export async function PUT(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/financeiro/" + id);
  if (proxied) return proxied;
  const body = await req.json().catch(() => ({}));
  const updated = updateEntity<LancamentoFinanceiro>("financeiro", id, body);
  if (!updated) return notFoundMock();
  return itemMock(updated);
}

export async function DELETE(req: Request) {
  const id = parseIdFromUrl(req);
  const proxied = await maybeProxy(req, "/financeiro/" + id);
  if (proxied) return proxied;
  const ok = deleteEntity<LancamentoFinanceiro>("financeiro", id);
  if (!ok) return notFoundMock();
  return okMock({ ok: true, source: "mock" }, 200);
}


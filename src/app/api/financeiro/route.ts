import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

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
  const proxied = await maybeProxy(req, "/financeiro");
  if (proxied) return proxied;
  return listMock(listEntities<LancamentoFinanceiro>("financeiro"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/financeiro");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<LancamentoFinanceiro>("financeiro", {
    descricao: String(body?.descricao ?? ""),
    tipo: (body?.tipo ?? "pagar") as LancamentoFinanceiro["tipo"],
    valor: Number(body?.valor ?? 0),
  } as unknown as Omit<LancamentoFinanceiro, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

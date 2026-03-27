import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

export type FinanceiroItem = {
  id: string;
  descricao: string;
  valor: number;
  vencimento: string;
  status: "Pendente" | "Pago" | "Atrasado" | "Cancelado";
  tipo: "Pagamento" | "Recebimento";
  created_at: string;
  updated_at: string;
};

// Seed de exemplo para Recebimentos
seedEntities<FinanceiroItem>("recebimentos", [
  {
    id: "rec_1",
    descricao: "Venda Projeto Alpha",
    valor: 5000.0,
    vencimento: new Date().toISOString(),
    status: "Pago",
    tipo: "Recebimento",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/financeiro/recebimentos");
  if (proxied) return proxied;
  return listMock(listEntities<FinanceiroItem>("recebimentos"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/financeiro/recebimentos");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<FinanceiroItem>("recebimentos", {
    descricao: String(body?.descricao ?? ""),
    valor: Number(body?.valor ?? 0),
    vencimento: String(body?.vencimento ?? new Date().toISOString()),
    status: String(body?.status ?? "Pendente"),
    tipo: "Recebimento",
  } as unknown as Omit<FinanceiroItem, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

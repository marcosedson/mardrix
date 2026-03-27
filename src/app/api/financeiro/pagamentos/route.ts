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

// Seed de exemplo para Pagamentos
seedEntities<FinanceiroItem>("pagamentos", [
  {
    id: "pag_1",
    descricao: "Aluguel Escritório",
    valor: 2500.0,
    vencimento: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    status: "Pendente",
    tipo: "Pagamento",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/financeiro/pagamentos");
  if (proxied) return proxied;
  return listMock(listEntities<FinanceiroItem>("pagamentos"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/financeiro/pagamentos");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<FinanceiroItem>("pagamentos", {
    descricao: String(body?.descricao ?? ""),
    valor: Number(body?.valor ?? 0),
    vencimento: String(body?.vencimento ?? new Date().toISOString()),
    status: String(body?.status ?? "Pendente"),
    tipo: "Pagamento",
  } as unknown as Omit<FinanceiroItem, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

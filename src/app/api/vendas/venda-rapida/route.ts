import { listMock, itemMock } from "@/lib/crud/route-helpers";
import { vendaRapidaSchema } from "@/lib/crud/schemas";

const MOCK_VENDAS_PDV = [
  { id: "1", cliente_nome: "Consumidor Final", valor_bruto: 150, desconto: 10, valor_total: 140, forma_pagamento: "PIX", data: "2026-03-26", vendedor_nome: "Carlos" },
  { id: "2", cliente_nome: "Ana Maria", valor_bruto: 89.90, desconto: 0, valor_total: 89.90, forma_pagamento: "Cartão", data: "2026-03-26", vendedor_nome: "Carlos" },
  { id: "3", cliente_nome: "Consumidor Final", valor_bruto: 210, desconto: 20, valor_total: 190, forma_pagamento: "Dinheiro", data: "2026-03-25", vendedor_nome: "Ana" },
];

export async function GET() {
  return listMock(MOCK_VENDAS_PDV);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = vendaRapidaSchema.safeParse(body);
  if (!result.success) return new Response(JSON.stringify(result.error), { status: 400 });
  return itemMock({ ...result.data, id: Math.random().toString(36).substring(7) }, 201);
}

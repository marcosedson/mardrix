import { listMock, itemMock } from "@/lib/crud/route-helpers";
import { cupomSchema } from "@/lib/crud/schemas";

const MOCK_CUPONS = [
  { id: "1", codigo: "VERAO2026", tipo: "Percentual", valor: 15, uso_atual: 45, uso_maximo: 100, ativo: true, validade_fim: "2026-03-31" },
  { id: "2", codigo: "BEMVINDO50", tipo: "Fixo", valor: 50, uso_atual: 120, uso_maximo: 200, ativo: true, validade_fim: "2026-12-31" },
  { id: "3", codigo: "LIQUIDA10", tipo: "Percentual", valor: 10, uso_atual: 300, uso_maximo: 300, ativo: false, validade_fim: "2026-01-01" },
];

export async function GET() {
  return listMock(MOCK_CUPONS);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = cupomSchema.safeParse(body);
  if (!result.success) return new Response(JSON.stringify(result.error), { status: 400 });
  return itemMock({ ...result.data, id: Math.random().toString(36).substring(7) }, 201);
}

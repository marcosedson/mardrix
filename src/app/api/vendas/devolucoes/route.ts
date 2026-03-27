import { listMock, itemMock } from "@/lib/crud/route-helpers";
import { devolucaoSchema } from "@/lib/crud/schemas";

const MOCK_DEVOLUCOES = [
  { id: "1", cliente_nome: "Maria Oliveira", data: "2026-03-22", motivo: "Tamanho incorreto", valor_estorno: 150.00, status: "Pendente" },
  { id: "2", cliente_nome: "João Silva", data: "2026-03-20", motivo: "Defeito de fábrica", valor_estorno: 250.00, status: "Aprovada" },
  { id: "3", cliente_nome: "Ana Santos", data: "2026-03-18", motivo: "Desistência", valor_estorno: 89.90, status: "Rejeitada" },
];

export async function GET() {
  return listMock(MOCK_DEVOLUCOES);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = devolucaoSchema.safeParse(body);
  if (!result.success) return new Response(JSON.stringify(result.error), { status: 400 });
  return itemMock({ ...result.data, id: Math.random().toString(36).substring(7) }, 201);
}

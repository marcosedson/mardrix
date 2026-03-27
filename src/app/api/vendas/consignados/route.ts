import { listMock, itemMock } from "@/lib/crud/route-helpers";
import { consignadoSchema } from "@/lib/crud/schemas";

const MOCK_CONSIGNADOS = [
  { id: "1", cliente_nome: "Maria Oliveira", data_saida: "2026-03-20", data_acerto: "2026-03-27", valor_total: 1250.50, status: "Aberto" },
  { id: "2", cliente_nome: "João Silva", data_saida: "2026-03-15", data_acerto: "2026-03-22", valor_total: 800.00, status: "Acertado Parcial" },
  { id: "3", cliente_nome: "Ana Santos", data_saida: "2026-03-01", data_acerto: "2026-03-08", valor_total: 450.00, status: "Finalizado" },
];

export async function GET() {
  return listMock(MOCK_CONSIGNADOS);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = consignadoSchema.safeParse(body);
  if (!result.success) return new Response(JSON.stringify(result.error), { status: 400 });
  return itemMock({ ...result.data, id: Math.random().toString(36).substring(7) }, 201);
}

import { listMock, itemMock } from "@/lib/crud/route-helpers";
import { comissaoSchema } from "@/lib/crud/schemas";

const MOCK_COMISSOES = [
  { id: "1", vendedor_nome: "Carlos Vendedor", valor_venda: 2500, percentual: 5, valor_comissao: 125, data_venda: "2026-03-25", status: "Pendente" },
  { id: "2", vendedor_nome: "Ana Vendedora", valor_venda: 1800, percentual: 3, valor_comissao: 54, data_venda: "2026-03-24", status: "Pago" },
  { id: "3", vendedor_nome: "Carlos Vendedor", valor_venda: 3200, percentual: 5, valor_comissao: 160, data_venda: "2026-03-23", status: "Pendente" },
];

export async function GET() {
  return listMock(MOCK_COMISSOES);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = comissaoSchema.safeParse(body);
  if (!result.success) return new Response(JSON.stringify(result.error), { status: 400 });
  return itemMock({ ...result.data, id: Math.random().toString(36).substring(7) }, 201);
}

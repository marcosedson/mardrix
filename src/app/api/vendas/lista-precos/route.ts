import { listMock, itemMock } from "@/lib/crud/route-helpers";
import { listaPrecoSchema } from "@/lib/crud/schemas";

const MOCK_LISTAS = [
  { id: "1", nome: "Venda Padrão", percentual_ajuste: 0, tipo_ajuste: "Acréscimo", base_calculo: "Venda", ativo: true },
  { id: "2", nome: "Atacado Especial", percentual_ajuste: 15, tipo_ajuste: "Desconto", base_calculo: "Venda", ativo: true },
  { id: "3", nome: "Revenda Ouro", percentual_ajuste: 20, tipo_ajuste: "Desconto", base_calculo: "Venda", ativo: true },
  { id: "4", nome: "Markup Custo", percentual_ajuste: 100, tipo_ajuste: "Acréscimo", base_calculo: "Custo", ativo: true },
];

export async function GET() {
  return listMock(MOCK_LISTAS);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = listaPrecoSchema.safeParse(body);
  if (!result.success) return new Response(JSON.stringify(result.error), { status: 400 });
  return itemMock({ ...result.data, id: Math.random().toString(36).substring(7) }, 201);
}

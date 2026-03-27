import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

export type Servico = {
  id: string;
  nome: string;
  preco: number;
  tempo_estimado?: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
};

seedEntities<Servico>("servicos", [
  {
    id: "serv_1",
    nome: "Consultoria Técnica",
    preco: 150.0,
    tempo_estimado: "1h",
    ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/servicos");
  if (proxied) return proxied;
  return listMock(listEntities<Servico>("servicos"));
}

export async function POST(req: Request) {
  const proxied = await maybeProxy(req, "/servicos");
  if (proxied) return proxied;

  const body = await req.json().catch(() => ({}));
  const created = createEntity<Servico>("servicos", {
    nome: String(body?.nome ?? ""),
    preco_venda: Number(body?.preco_venda ?? 0),
    codigo_servico: body?.codigo_servico ? String(body.codigo_servico) : "",
    aliquota_iss: Number(body?.aliquota_iss ?? 0),
    descricao: body?.descricao ? String(body.descricao) : "",
    ativo: Boolean(body?.ativo ?? true),
  } as unknown as Omit<Servico, "id" | "created_at" | "updated_at">);

  return itemMock(created, 201);
}

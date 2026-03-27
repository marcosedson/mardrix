import { maybeProxy, listMock, itemMock } from "@/lib/crud/route-helpers";
import { createEntity, listEntities, seedEntities } from "@/lib/crud/store";

export type CrmEntry = {
  id: string;
  cliente_nome: string;
  tipo_interacao: string;
  data: string;
  descricao: string;
  status_lead: string;
  created_at: string;
  updated_at: string;
};

seedEntities<CrmEntry>("crm", [
  {
    id: "crm_1",
    cliente_nome: "Loja do João",
    tipo_interacao: "Contato",
    data: new Date().toISOString().split("T")[0],
    descricao: "Cliente interessado na nova coleção de inverno.",
    status_lead: "Quente",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]);

export async function GET(req: Request) {
  const proxied = await maybeProxy(req, "/vendas/crm");
  if (proxied) return proxied;
  return listMock(listEntities<CrmEntry>("crm"));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const created = createEntity<CrmEntry>("crm", {
    cliente_nome: body.cliente_nome,
    tipo_interacao: body.tipo_interacao,
    data: body.data,
    descricao: body.descricao,
    status_lead: body.status_lead,
  } as any);
  return itemMock(created, 201);
}

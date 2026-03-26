import { NextResponse } from "next/server";

import { tryProxyToApi } from "@/lib/bff";
import { mockHistoricoEtiquetas } from "@/lib/etiquetas/historico-mock";

export async function GET(req: Request) {
  // 1) Tenta API Go (quando estiver disponível)
  const proxied = await tryProxyToApi(req, "/etiquetas/historico");
  if (proxied) {
    const headers = new Headers(proxied.headers);
    headers.set("x-mardrix-source", "api");
    const buf = await proxied.arrayBuffer();
    return new Response(buf, { status: proxied.status, headers });
  }

  // 2) Fallback mock
  const url = new URL(req.url);
  const diasStr = url.searchParams.get("dias") ?? "7";
  const parsed = Math.floor(Number(diasStr));
  const dias = Number.isFinite(parsed) ? Math.max(1, parsed) : 7;

  const now = Date.now();
  const cutoff = now - dias * 24 * 60 * 60 * 1000;

  const items = mockHistoricoEtiquetas.filter((h) => {
    const t = new Date(h.gerado_em).getTime();
    return Number.isFinite(t) && t >= cutoff;
  });

  const res = NextResponse.json({ dias, items, source: "mock" });
  res.headers.set("x-mardrix-source", "mock");
  return res;
}

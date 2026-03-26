import { tryProxyToApi } from "@/lib/bff";

// Placeholder: no futuro, isso vai gravar no Supabase via API Go.
// Por enquanto, apenas valida payload e retorna 201.

type EventoGeracaoEtiqueta = {
  produto_id: string;
  modelo: string;
  copias: number;
  gerado_em?: string;
};

export async function POST(req: Request) {
  // 1) tenta encaminhar pra API Go (quando existir)
  const proxied = await tryProxyToApi(req, "/etiquetas/eventos");
  if (proxied) {
    const headers = new Headers(proxied.headers);
    headers.set("x-mardrix-source", "api");
    const buf = await proxied.arrayBuffer();
    return new Response(buf, { status: proxied.status, headers });
  }

  // 2) fallback placeholder
  const body = (await req.json().catch(() => null)) as
    | { eventos?: EventoGeracaoEtiqueta[] }
    | null;

  const eventos: EventoGeracaoEtiqueta[] = Array.isArray(body?.eventos)
    ? body?.eventos ?? []
    : [];

  const normalized = eventos
    .map((e) => ({
      produto_id: String(e.produto_id ?? ""),
      modelo: String(e.modelo ?? ""),
      copias: Math.max(0, Math.floor(Number(e.copias ?? 0))),
      gerado_em: e.gerado_em ? String(e.gerado_em) : new Date().toISOString(),
    }))
    .filter((e) => e.produto_id && e.modelo && e.copias > 0);

  return new Response(
    JSON.stringify({
      ok: true,
      received: normalized.length,
      source: "mock",
    }),
    {
      status: 201,
      headers: {
        "content-type": "application/json",
        "x-mardrix-source": "mock",
      },
    }
  );
}

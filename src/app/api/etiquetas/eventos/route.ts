import { tryProxyToApi } from "@/lib/bff";
import { requireBearer, unauthorized } from "@/lib/bff-auth";
import { bffError, bffInternalError } from "@/lib/bff-error";

// Placeholder: no futuro, isso vai gravar no Supabase via API Go.
// Por enquanto, apenas valida payload e retorna 201.

type EventoGeracaoEtiqueta = {
  produto_id: string;
  modelo: string;
  copias: number;
  gerado_em?: string;
};

export async function POST(req: Request) {
  try {
    const bearer = requireBearer(req);
    if (!bearer) return unauthorized();

    // 1) tenta encaminhar pra API Go (quando existir)
    const proxied = await tryProxyToApi(req, "/etiquetas/eventos");
    if (proxied) {
      const headers = new Headers(proxied.headers);
      headers.set("x-mardrix-source", "api");
      const buf = await proxied.arrayBuffer();
      return new Response(buf, { status: proxied.status, headers });
    }

    // 2) fallback placeholder
    const raw = (await req.json().catch(() => null)) as unknown;
    if (!raw || typeof raw !== "object") {
      return bffError(400, "bad_request", "Payload inválido", "mock");
    }

    const body = raw as { eventos?: unknown };

    const eventos: EventoGeracaoEtiqueta[] = Array.isArray(body?.eventos)
      ? (body?.eventos as EventoGeracaoEtiqueta[])
      : [];

    const normalized = eventos
      .map((e) => ({
        produto_id: String((e as EventoGeracaoEtiqueta).produto_id ?? ""),
        modelo: String((e as EventoGeracaoEtiqueta).modelo ?? ""),
        copias: Math.max(0, Math.floor(Number((e as EventoGeracaoEtiqueta).copias ?? 0))),
        gerado_em: (e as EventoGeracaoEtiqueta).gerado_em
          ? String((e as EventoGeracaoEtiqueta).gerado_em)
          : new Date().toISOString(),
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
  } catch (err) {
    return bffInternalError(err, "bff");
  }
}

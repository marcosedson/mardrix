import { jsonMock, tryProxyToApi } from "@/lib/bff";
import { requireBearer, unauthorized } from "@/lib/bff-auth";

export type CrudListResponse<T> = { items: T[]; source: "mock" | "api" | string };
export type CrudItemResponse<T> = { item: T; source: "mock" | "api" | string };

export async function maybeProxy(req: Request, upstreamPath: string) {
  // Exige auth em todos os módulos protegidos.
  const bearer = requireBearer(req);
  if (!bearer) return unauthorized();

  const proxied = await tryProxyToApi(req, upstreamPath);
  if (!proxied) return null;

  const headers = new Headers(proxied.headers);
  headers.set("x-mardrix-source", "api");
  const buf = await proxied.arrayBuffer();
  return new Response(buf, { status: proxied.status, headers });
}

export function listMock<T>(items: T[]) {
  return jsonMock({ items, source: "mock" } satisfies CrudListResponse<T>);
}

export function itemMock<T>(item: T, status = 200) {
  return jsonMock({ item, source: "mock" } satisfies CrudItemResponse<T>,
    { status } satisfies { status?: number; headers?: HeadersInit }
  );
}

export function notFoundMock(message = "Not found") {
  return new Response(
    JSON.stringify({ ok: false, error: "not_found", message, source: "mock" }),
    {
      status: 404,
      headers: {
        "content-type": "application/json",
        "x-mardrix-source": "mock",
      },
    }
  );
}

export function okMock(body: unknown, status = 200) {
  return jsonMock(body, { status });
}

export function parseIdFromUrl(req: Request): string {
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function proxyToApi(req: Request, upstreamPath: string) {
  const url = new URL(req.url);
  const upstreamUrl = new URL(`${API_BASE_URL}${upstreamPath}`);

  // Mantém querystring
  upstreamUrl.search = url.search;

  const headers = new Headers(req.headers);

  // Host/encoding podem quebrar proxy em alguns backends
  headers.delete("host");
  headers.delete("content-length");

  const method = req.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);

  const res = await fetch(upstreamUrl.toString(), {
    method,
    headers,
    body: hasBody ? await req.arrayBuffer() : undefined,
    redirect: "manual",
  });

  // Pass-through de status e headers essenciais
  const outHeaders = new Headers(res.headers);
  outHeaders.delete("content-encoding");
  outHeaders.delete("content-length");

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const data = await res.json().catch(() => null);
    return NextResponse.json(data, { status: res.status, headers: outHeaders });
  }

  const buf = await res.arrayBuffer();
  return new NextResponse(buf, { status: res.status, headers: outHeaders });
}

export async function tryProxyToApi(
  req: Request,
  upstreamPath: string,
  opts?: { timeoutMs?: number }
): Promise<Response | null> {
  const timeoutMs = opts?.timeoutMs ?? 1200;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = new URL(req.url);
    const upstreamUrl = new URL(`${API_BASE_URL}${upstreamPath}`);
    upstreamUrl.search = url.search;

    const headers = new Headers(req.headers);
    headers.delete("host");
    headers.delete("content-length");

    const method = req.method.toUpperCase();
    const hasBody = !["GET", "HEAD"].includes(method);

    const res = await fetch(upstreamUrl.toString(), {
      method,
      headers,
      body: hasBody ? await req.arrayBuffer() : undefined,
      redirect: "manual",
      signal: controller.signal,
    } as RequestInit);

    return res;
  } catch {
    // API indisponível/timeout
    return null;
  } finally {
    clearTimeout(t);
  }
}

export function jsonMock(body: unknown, init?: { status?: number; headers?: HeadersInit }) {
  const res = NextResponse.json(body, { status: init?.status ?? 200 });
  res.headers.set("x-mardrix-source", "mock");
  if (init?.headers) {
    for (const [k, v] of Object.entries(init.headers)) {
      res.headers.set(k, String(v));
    }
  }
  return res;
}

import { getSessionToken, getTenantContext } from "@/lib/bff/session";
import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "";

export const isBackendConfigured = () => BACKEND_API_URL.trim().length > 0;

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");

const toBackendUrl = (path: string) => {
  const base = trimSlashes(BACKEND_API_URL);
  const suffix = trimSlashes(path);
  return `${base}/${suffix}`;
};

export async function proxyToBackend(request: Request, path: string) {
  if (!isBackendConfigured()) {
    return null;
  }

  const token = await getSessionToken();
  const tenant = await getTenantContext();
  const headers = new Headers();

  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers.set("content-type", contentType);
  }

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  if (tenant.companyId) {
    headers.set("x-tenant-company", tenant.companyId);
  }

  if (tenant.branchId) {
    headers.set("x-tenant-branch", tenant.branchId);
  }

  const method = request.method.toUpperCase();
  const body = method === "GET" || method === "HEAD" ? undefined : await request.text();
  const response = await fetch(toBackendUrl(path), {
    method,
    headers,
    body,
    cache: "no-store",
  });

  const payloadText = await response.text();

  try {
    const payload = JSON.parse(payloadText) as unknown;
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return new NextResponse(payloadText, {
      status: response.status,
      headers: { "content-type": response.headers.get("content-type") ?? "text/plain" },
    });
  }
}


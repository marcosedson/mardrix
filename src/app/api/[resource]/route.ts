import { proxyToBackend } from "@/lib/bff/proxy";
import {
  createResource,
  isValidResource,
  listResource,
  type ResourceName,
} from "@/modules/shared/mockDb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  const { resource } = await context.params;

  const url = new URL(request.url);
  const query = url.searchParams.toString();
  const proxied = await proxyToBackend(request, `/${resource}${query ? `?${query}` : ""}`);
  if (proxied) {
    return proxied;
  }

  if (!isValidResource(resource)) {
    return NextResponse.json({ message: "Recurso nao encontrado" }, { status: 404 });
  }

  const page = Number(url.searchParams.get("page") ?? 1);
  const pageSize = Number(url.searchParams.get("pageSize") ?? 10);
  const search = url.searchParams.get("search") ?? "";

  const rows = listResource(resource as ResourceName, search);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return NextResponse.json({
    items: rows.slice(start, end),
    total: rows.length,
    page,
    pageSize,
  });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  const { resource } = await context.params;

  const proxied = await proxyToBackend(request, `/${resource}`);
  if (proxied) {
    return proxied;
  }

  if (!isValidResource(resource)) {
    return NextResponse.json({ message: "Recurso nao encontrado" }, { status: 404 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const created = createResource(resource as ResourceName, body);

  return NextResponse.json(created, { status: 201 });
}


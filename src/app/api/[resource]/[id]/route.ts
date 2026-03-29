import { proxyToBackend } from "@/lib/bff/proxy";
import {
  deleteResource,
  getResourceById,
  isValidResource,
  updateResource,
  type ResourceName,
} from "@/modules/shared/mockDb";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ resource: string; id: string }> },
) {
  const { resource, id } = await context.params;

  const proxied = await proxyToBackend(_request, `/${resource}/${id}`);
  if (proxied) {
    return proxied;
  }

  if (!isValidResource(resource)) {
    return NextResponse.json({ message: "Recurso nao encontrado" }, { status: 404 });
  }

  const row = getResourceById(resource as ResourceName, id);
  if (!row) {
    return NextResponse.json({ message: "Registro nao encontrado" }, { status: 404 });
  }

  return NextResponse.json(row);
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ resource: string; id: string }> },
) {
  const { resource, id } = await context.params;

  const proxied = await proxyToBackend(request, `/${resource}/${id}`);
  if (proxied) {
    return proxied;
  }

  if (!isValidResource(resource)) {
    return NextResponse.json({ message: "Recurso nao encontrado" }, { status: 404 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const updated = updateResource(resource as ResourceName, id, body);
  if (!updated) {
    return NextResponse.json({ message: "Registro nao encontrado" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ resource: string; id: string }> },
) {
  const { resource, id } = await context.params;

  const proxied = await proxyToBackend(_request, `/${resource}/${id}`);
  if (proxied) {
    return proxied;
  }

  if (!isValidResource(resource)) {
    return NextResponse.json({ message: "Recurso nao encontrado" }, { status: 404 });
  }

  const removed = deleteResource(resource as ResourceName, id);
  if (!removed) {
    return NextResponse.json({ message: "Registro nao encontrado" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}


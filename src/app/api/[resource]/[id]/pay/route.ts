import { proxyToBackend } from "@/lib/bff/proxy";
import { isValidResource, markAsPaid, type ResourceName } from "@/modules/shared/mockDb";
import { NextResponse } from "next/server";

export async function PATCH(
  _request: Request,
  context: { params: Promise<{ resource: string; id: string }> },
) {
  const { resource, id } = await context.params;

  const proxied = await proxyToBackend(_request, `/${resource}/${id}/pay`);
  if (proxied) {
    return proxied;
  }

  if (!isValidResource(resource)) {
    return NextResponse.json({ message: "Recurso nao encontrado" }, { status: 404 });
  }

  const updated = markAsPaid(resource as ResourceName, id);
  if (!updated) {
    return NextResponse.json({ message: "Registro nao encontrado" }, { status: 404 });
  }

  return NextResponse.json(updated);
}


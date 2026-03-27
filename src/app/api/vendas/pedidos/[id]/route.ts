import { notFoundMock, okMock, parseIdFromUrl, itemMock } from "@/lib/crud/route-helpers";

export async function GET(req: Request) {
  const id = parseIdFromUrl(req);
  return itemMock({ id, name: "Item Mock", source: "mock" });
}

export async function PUT(req: Request) {
  const id = parseIdFromUrl(req);
  const body = await req.json().catch(() => ({}));
  return itemMock({ ...body, id, updated: true, source: "mock" });
}

export async function DELETE(req: Request) {
  const id = parseIdFromUrl(req);
  return okMock({ ok: true, id, message: "Deleted successfully", source: "mock" }, 200);
}

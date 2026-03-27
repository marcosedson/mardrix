import { proxyToApi } from "@/lib/bff";
import { requireBearer, unauthorized } from "@/lib/bff-auth";
import { bffInternalError } from "@/lib/bff-error";

export async function GET(req: Request) {
  try {
    const bearer = requireBearer(req);
    if (!bearer) return unauthorized();

    // backend pode expor catálogo/consultas de etiquetas
    return proxyToApi(req, "/etiquetas");
  } catch (err) {
    return bffInternalError(err, "bff");
  }
}

export async function POST(req: Request) {
  try {
    const bearer = requireBearer(req);
    if (!bearer) return unauthorized();

    return proxyToApi(req, "/etiquetas");
  } catch (err) {
    return bffInternalError(err, "bff");
  }
}

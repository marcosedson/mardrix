import { proxyToApi } from "@/lib/bff";

export async function GET(req: Request) {
  // backend pode expor catálogo/consultas de etiquetas
  return proxyToApi(req, "/etiquetas");
}

export async function POST(req: Request) {
  return proxyToApi(req, "/etiquetas");
}


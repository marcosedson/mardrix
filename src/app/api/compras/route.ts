import { proxyToApi } from "@/lib/bff";

export async function GET(req: Request) {
  return proxyToApi(req, "/compras");
}

export async function POST(req: Request) {
  return proxyToApi(req, "/compras");
}


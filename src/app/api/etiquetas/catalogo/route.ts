import { NextResponse } from "next/server";

import { tryProxyToApi } from "@/lib/bff";
import { requireBearer, unauthorized } from "@/lib/bff-auth";
import { bffInternalError } from "@/lib/bff-error";
import {
  mockCategorias,
  mockFornecedores,
  mockProdutos,
} from "@/lib/etiquetas/catalogo-mock";

export async function GET(req: Request) {
  try {
    const bearer = requireBearer(req);
    if (!bearer) return unauthorized();

    // 1) tenta API Go (quando existir)
    const proxied = await tryProxyToApi(req, "/etiquetas/catalogo");
    if (proxied) {
      const headers = new Headers(proxied.headers);
      headers.set("x-mardrix-source", "api");
      const buf = await proxied.arrayBuffer();
      return new Response(buf, { status: proxied.status, headers });
    }

    // 2) fallback mock
    const res = NextResponse.json({
      categorias: mockCategorias,
      fornecedores: mockFornecedores,
      produtos: mockProdutos,
      source: "mock",
    });
    res.headers.set("x-mardrix-source", "mock");
    return res;
  } catch (err) {
    return bffInternalError(err, "bff");
  }
}

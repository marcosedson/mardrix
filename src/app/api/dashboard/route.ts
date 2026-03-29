import { proxyToBackend } from "@/lib/bff/proxy";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const proxied = await proxyToBackend(request, "/dashboard");
  if (proxied) {
    return proxied;
  }

  return NextResponse.json({
    metrics: {
      faturamentoDia: 4580.35,
      contasReceber: 12400.5,
      contasPagar: 6530.9,
      saldoCaixa: 9320.7,
    },
    recentSales: [
      { id: "VD-1001", customer: "Ana Ribeiro", total: 199.8, status: "finalized", createdAt: "2026-03-29" },
      { id: "VD-1002", customer: "Carlos Lima", total: 359.9, status: "pending", createdAt: "2026-03-29" },
      { id: "VD-1003", customer: "Loja Centro", total: 89.9, status: "finalized", createdAt: "2026-03-28" },
    ],
  });
}


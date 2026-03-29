import { proxyToBackend } from "@/lib/bff/proxy";
import type { CashSummary } from "@/types/erp";
import { NextResponse } from "next/server";

let cashSummary: CashSummary = {
  currentBalance: 3500,
  totalEntries: 5200,
  totalExits: 1700,
  isOpen: true,
};

export async function GET(request: Request) {
  const proxied = await proxyToBackend(request, "/cash");
  if (proxied) {
    return proxied;
  }

  return NextResponse.json(cashSummary);
}

export async function POST(request: Request) {
  const proxied = await proxyToBackend(request, "/cash");
  if (proxied) {
    return proxied;
  }

  const body = (await request.json()) as {
    action?: "open" | "close" | "movement";
    amount?: number;
  };

  if (body.action === "open") {
    cashSummary = { ...cashSummary, isOpen: true };
  }

  if (body.action === "close") {
    cashSummary = { ...cashSummary, isOpen: false };
  }

  if (body.action === "movement") {
    const amount = Number(body.amount ?? 0);
    cashSummary = {
      ...cashSummary,
      currentBalance: cashSummary.currentBalance + amount,
      totalEntries: amount > 0 ? cashSummary.totalEntries + amount : cashSummary.totalEntries,
      totalExits: amount < 0 ? cashSummary.totalExits + Math.abs(amount) : cashSummary.totalExits,
    };
  }

  return NextResponse.json(cashSummary);
}


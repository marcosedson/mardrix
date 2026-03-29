import {
  TENANT_BRANCH_COOKIE,
  TENANT_COMPANY_COOKIE,
} from "@/lib/bff/session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    companyId?: string;
    branchId?: string;
  };

  if (!body.companyId || !body.branchId) {
    return NextResponse.json({ message: "Tenant invalido" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(TENANT_COMPANY_COOKIE, body.companyId, {
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set(TENANT_BRANCH_COOKIE, body.branchId, {
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}


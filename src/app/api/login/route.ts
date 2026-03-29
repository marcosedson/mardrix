import { isBackendConfigured } from "@/lib/bff/proxy";
import {
  SESSION_COOKIE,
  TENANT_BRANCH_COOKIE,
  TENANT_COMPANY_COOKIE,
} from "@/lib/bff/session";
import { NextResponse } from "next/server";

const VALID_USER = {
  email: "admin@mardrix.com",
  password: "123456",
  token: "mardrix-token-demo",
};

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (isBackendConfigured()) {
    const loginPath = process.env.BACKEND_LOGIN_PATH ?? "/auth/login";
    const backendResponse = await fetch(`${process.env.BACKEND_API_URL}${loginPath}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const payload = (await backendResponse.json()) as {
      token?: string;
      accessToken?: string;
      user?: { email?: string };
      companyId?: string;
      branchId?: string;
      message?: string;
    };

    if (!backendResponse.ok) {
      return NextResponse.json({ message: payload.message ?? "Falha no login" }, { status: backendResponse.status });
    }

    const token = payload.token ?? payload.accessToken ?? "";
    const response = NextResponse.json({
      token,
      user: { email: payload.user?.email ?? body.email ?? "" },
    });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    response.cookies.set(TENANT_COMPANY_COOKIE, payload.companyId ?? "empresa-matriz", {
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    response.cookies.set(TENANT_BRANCH_COOKIE, payload.branchId ?? "matriz", {
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  }

  if (body.email === VALID_USER.email && body.password === VALID_USER.password) {
    const response = NextResponse.json({ token: VALID_USER.token, user: { email: VALID_USER.email } });
    response.cookies.set(SESSION_COOKIE, VALID_USER.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    response.cookies.set(TENANT_COMPANY_COOKIE, "empresa-matriz", {
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    response.cookies.set(TENANT_BRANCH_COOKIE, "matriz", {
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  }

  return NextResponse.json({ message: "Credenciais invalidas" }, { status: 401 });
}


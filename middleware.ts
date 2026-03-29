import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = new Set(["/signin", "/signup"]);

const shouldSkipTenantGuard = (pathname: string) => {
  return pathname === "/settings" || pathname.startsWith("/api/tenant");
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.has(pathname) || pathname.startsWith("/api/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("mardrix_token")?.value;
  if (!token) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ message: "Nao autenticado" }, { status: 401 });
    }

    const signinUrl = new URL("/signin", request.url);
    signinUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(signinUrl);
  }

  const company = request.cookies.get("mardrix_company")?.value;
  const branch = request.cookies.get("mardrix_branch")?.value;
  const hasTenant = Boolean(company && branch);

  if (!hasTenant && !shouldSkipTenantGuard(pathname)) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ message: "Tenant nao definido" }, { status: 400 });
    }

    const settingsUrl = new URL("/settings", request.url);
    settingsUrl.searchParams.set("tenant", "required");
    return NextResponse.redirect(settingsUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};


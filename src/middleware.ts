import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Observação: como estamos usando Firebase Auth no client, o middleware não consegue validar sessão
// sem Firebase Admin (server). Nesta fase, apenas protegemos rotas por "soft redirect":
// as páginas do dashboard fazem guard no client e, no futuro, isso vira validação server-side.

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login") || pathname.startsWith("/cadastro") || pathname.startsWith("/api/health")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};


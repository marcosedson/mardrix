import { NextResponse } from "next/server";

import { requireBearer, unauthorized } from "@/lib/bff-auth";
import { bffInternalError } from "@/lib/bff-error";
import { verifyIdToken } from "@/lib/firebase/admin";

export async function GET(req: Request) {
  try {
    const authHeader = requireBearer(req);
    if (!authHeader) return unauthorized();

    const token = authHeader.split(" ")[1];

    // Se estiver em dev e sem chave de admin, retornamos mock mas usando o email se possível
    if (process.env.NODE_ENV === "development" && !process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
       console.warn("FIREBASE_SERVICE_ACCOUNT_KEY não configurada. Usando mock em /api/auth/me");
       return NextResponse.json({
        ok: true,
        user: { email: "dev@mardrix.local" },
        claims: { tenant_id: "dev-tenant", role: "owner", plan: "starter" },
        source: "mock-dev",
      });
    }

    try {
      const decoded = await verifyIdToken(token);
      
      const res = NextResponse.json({
        ok: true,
        user: { email: decoded.email },
        claims: { 
          tenant_id: decoded.tenant_id || "pending-onboarding", 
          role: decoded.role || "owner", 
          plan: decoded.plan || "free" 
        },
        source: "firebase-admin",
      });
      res.headers.set("x-mardrix-source", "firebase-admin");
      return res;
    } catch (err) {
      console.error("Token invalido no BFF:", err);
      return unauthorized("Token inválido");
    }
  } catch (err) {
    return bffInternalError(err, "bff");
  }
}

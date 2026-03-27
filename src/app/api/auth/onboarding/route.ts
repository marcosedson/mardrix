import * as admin from "firebase-admin";
import { NextResponse } from "next/server";

import { requireBearer, unauthorized } from "@/lib/bff-auth";
import { bffError, bffInternalError } from "@/lib/bff-error";
import { getFirebaseAdmin, verifyIdToken } from "@/lib/firebase/admin";

export async function POST(req: Request) {
  try {
    const authHeader = requireBearer(req);
    if (!authHeader) return unauthorized();

    const token = authHeader.split(" ")[1];
    const body = (await req.json().catch(() => ({}))) as any;

    if (!body.nomeEmpresa) {
      return bffError(400, "bad_request", "Nome da empresa é obrigatório", "bff");
    }

    // Se estiver em dev e sem chave de admin, retornamos mock de sucesso
    if (process.env.NODE_ENV === "development" && !process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      console.warn("FIREBASE_SERVICE_ACCOUNT_KEY não configurada. Simulando onboarding.");
      return NextResponse.json({
        ok: true,
        tenant_id: "dev-tenant",
        role: "owner",
        source: "mock-dev",
      }, { status: 201 });
    }

    try {
      const decoded = await verifyIdToken(token);
      const uid = decoded.uid;

      const tenantId = `tenant-${Math.random().toString(36).substring(2, 9)}`;
      
      // Seta custom claims no Firebase Auth via Admin SDK
      const auth = getFirebaseAdmin().auth();
      await auth.setCustomUserClaims(uid, {
        tenant_id: tenantId,
        role: "owner",
        plan: "starter",
      });

      return NextResponse.json({
        ok: true,
        tenant_id: tenantId,
        role: "owner",
        source: "firebase-admin",
      }, { status: 201 });
    } catch (err) {
      console.error("Erro no onboarding:", err);
      return unauthorized("Token inválido ou falha ao setar claims");
    }
  } catch (err) {
    return bffInternalError(err, "bff");
  }
}

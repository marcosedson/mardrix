import { tryProxyToApi } from "@/lib/bff";
import { bffError, bffInternalError } from "@/lib/bff-error";

export async function GET(req: Request) {
  try {
    const proxied = await tryProxyToApi(req, "/auth/me");
    if (proxied) {
      const headers = new Headers(proxied.headers);
      headers.set("x-mardrix-source", "api");
      const buf = await proxied.arrayBuffer();
      return new Response(buf, { status: proxied.status, headers });
    }

    return bffError(410, "deprecated", "Use /api/auth/me", "bff");
  } catch (err) {
    return bffInternalError(err, "bff");
  }
}

export async function POST() {
  try {
    return bffError(410, "deprecated", "Use /api/auth/onboarding (cadastro) ou Firebase Auth (login)", "bff");
  } catch (err) {
    return bffInternalError(err, "bff");
  }
}

import { fetchWithAuth } from "@/lib/http/fetch-with-auth";

export type MeOk = {
  ok: true;
  user: { email?: string };
  claims: { tenant_id?: string; role?: string; plan?: string };
  source: string;
};

export type MeErr = { ok: false; error: "unauthorized" | "forbidden"; message?: string };

export type MeResponse = MeOk | MeErr;

function isMeResponse(value: unknown): value is MeResponse {
  if (!value || typeof value !== "object") return false;
  return "ok" in value;
}

export async function fetchMe(): Promise<MeResponse> {
  const res = await fetchWithAuth("/api/auth/me", { method: "GET" });
  const ct = res.headers.get("content-type") || "";
  const body: unknown = ct.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text();

  if (!res.ok) {
    if (isMeResponse(body)) return body;
    return { ok: false, error: "unauthorized", message: String(body) };
  }

  return body as MeResponse;
}

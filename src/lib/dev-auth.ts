export const DEV_AUTH_ENABLED =
  process.env.NEXT_PUBLIC_DEV_AUTH === "1" ||
  process.env.NEXT_PUBLIC_DEV_AUTH === "true";

export const DEV_AUTH_EMAIL =
  process.env.NEXT_PUBLIC_DEV_AUTH_EMAIL || "admin@mardrix.local";

export const DEV_AUTH_PASSWORD =
  process.env.NEXT_PUBLIC_DEV_AUTH_PASSWORD || "admin123";

export type DevAuthSession = {
  email: string;
  claims: { tenant_id: string; role: string; plan: string };
};

const LS_KEY = "mardrix:dev-auth";

type UnknownRecord = Record<string, unknown>;

function isRecord(v: unknown): v is UnknownRecord {
  return !!v && typeof v === "object";
}

export function getDevSession(): DevAuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return null;

    const email = parsed.email;
    const claimsRaw = parsed.claims;
    if (typeof email !== "string") return null;
    if (!isRecord(claimsRaw)) return null;

    return {
      email,
      claims: {
        tenant_id:
          typeof claimsRaw.tenant_id === "string" ? claimsRaw.tenant_id : "dev-tenant",
        role: typeof claimsRaw.role === "string" ? claimsRaw.role : "owner",
        plan: typeof claimsRaw.plan === "string" ? claimsRaw.plan : "starter",
      },
    };
  } catch {
    return null;
  }
}

export function setDevSession(session: DevAuthSession | null) {
  if (typeof window === "undefined") return;
  if (!session) {
    window.localStorage.removeItem(LS_KEY);
    return;
  }
  window.localStorage.setItem(LS_KEY, JSON.stringify(session));
}

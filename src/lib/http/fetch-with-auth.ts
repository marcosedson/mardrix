import { getIdToken } from "@/lib/firebase/auth";
import { DEV_AUTH_ENABLED, getDevSession } from "@/lib/dev-auth";

export async function fetchWithAuth(input: RequestInfo | URL, init?: RequestInit) {
  let token: string | null = null;

  if (DEV_AUTH_ENABLED) {
    const session = getDevSession();
    if (session) {
      // No modo dev usamos um token fixo simulado ou o email do usuário
      token = `dev-token-${session.email}`;
    }
  } else {
    token = await getIdToken();
  }

  const headers = new Headers(init?.headers);
  if (token) headers.set("authorization", `Bearer ${token}`);

  return fetch(input, {
    ...init,
    headers,
  });
}


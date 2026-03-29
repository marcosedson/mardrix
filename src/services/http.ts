import type { ApiResult } from "@/types/api";

const getTenantHeaders = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const company = localStorage.getItem("mardrix_company") ?? "";
  const branch = localStorage.getItem("mardrix_branch") ?? "";

  return {
    ...(company ? { "x-tenant-company": company } : {}),
    ...(branch ? { "x-tenant-branch": branch } : {}),
  };
};

export async function apiRequest<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<ApiResult<T>> {
  try {
    const response = await fetch(input, {
      ...init,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        ...getTenantHeaders(),
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });

    const payload = (await response.json()) as T | { message?: string };

    if (!response.ok) {
      return {
        error: {
          message:
            (payload as { message?: string }).message ?? "Erro inesperado na API",
          code: String(response.status),
        },
      };
    }

    return { data: payload as T };
  } catch {
    return { error: { message: "Falha de conexao com o servidor" } };
  }
}


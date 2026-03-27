export type BffErrorCode =
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "bad_request"
  | "internal"
  | "deprecated";

export type BffErrorBody = {
  ok: false;
  error: BffErrorCode;
  message?: string;
  source?: string;
};

export function bffError(
  status: number,
  error: BffErrorCode,
  message?: string,
  source: "bff" | "mock" | "api" = "bff",
  extra?: Record<string, unknown>
): Response {
  const base: BffErrorBody = {
    ok: false,
    error,
    ...(message ? { message } : {}),
    source,
  };

  const out = { ...(base as object), ...(extra ?? {}) } as Record<string, unknown>;

  return new Response(JSON.stringify(out), {
    status,
    headers: {
      "content-type": "application/json",
      "x-mardrix-source": source,
    },
  });
}

export function bffInternalError(
  err: unknown,
  source: "bff" | "mock" | "api" = "bff"
): Response {
  const message = err instanceof Error ? err.message : "Erro interno";
  return bffError(500, "internal", message, source);
}

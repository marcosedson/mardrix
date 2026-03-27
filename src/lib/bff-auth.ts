import { bffError } from "@/lib/bff-error";

export type BffErrorBody = {
  ok: false;
  error: "unauthorized" | "forbidden";
  message?: string;
};

export function requireBearer(req: Request): string {
  const auth = req.headers.get("authorization") || "";
  if (!auth.toLowerCase().startsWith("bearer ")) return "";
  return auth;
}

export function unauthorized(message = "Unauthorized") {
  return bffError(401, "unauthorized", message, "bff");
}

export function forbidden(message = "Forbidden") {
  return bffError(403, "forbidden", message, "bff");
}

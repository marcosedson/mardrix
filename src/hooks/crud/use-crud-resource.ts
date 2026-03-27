import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchWithAuth } from "@/lib/http/fetch-with-auth";

export type CrudListResponse<T> = { items: T[]; source: string };
export type CrudItemResponse<T> = { item: T; source: string };

async function readError(res: Response): Promise<string> {
  const ct = res.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) {
      const j = (await res.json()) as Record<string, unknown>;
      const msg = j["message"] ?? j["error"] ?? j;
      return typeof msg === "string" ? msg : JSON.stringify(msg);
    }
  } catch {
    // ignore
  }
  try {
    return await res.text();
  } catch {
    return `HTTP ${res.status}`;
  }
}

export function useCrudList<T>(resource: string) {
  return useQuery({
    queryKey: [resource, "list"],
    queryFn: async () => {
      const res = await fetchWithAuth(`/api/${resource}`);
      if (!res.ok) throw new Error(await readError(res));
      return (await res.json()) as CrudListResponse<T>;
    },
    staleTime: 15_000,
  });
}

export function useCrudCreate<TInput, TItem>(resource: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: TInput) => {
      const res = await fetchWithAuth(`/api/${resource}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error(await readError(res));
      return (await res.json()) as CrudItemResponse<TItem>;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [resource, "list"] });
    },
  });
}

export function useCrudUpdate<TInput, TItem>(resource: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { id: string; input: TInput }) => {
      const res = await fetchWithAuth(`/api/${resource}/${vars.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(vars.input),
      });
      if (!res.ok) throw new Error(await readError(res));
      return (await res.json()) as CrudItemResponse<TItem>;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [resource, "list"] });
    },
  });
}

export function useCrudDelete(resource: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetchWithAuth(`/api/${resource}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await readError(res));
      return (await res.json()) as { ok: boolean; source: string };
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: [resource, "list"] });
    },
  });
}

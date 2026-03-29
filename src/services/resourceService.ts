import { apiRequest } from "@/services/http";
import type { PaginatedResponse } from "@/types/api";

interface ListParams {
  page: number;
  pageSize: number;
  search: string;
}

export async function listResource<T>(resource: string, params: ListParams) {
  const query = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
    search: params.search,
  });

  return apiRequest<PaginatedResponse<T>>(`/api/${resource}?${query.toString()}`);
}

export async function createResource<T>(resource: string, payload: Record<string, unknown>) {
  return apiRequest<T>(`/api/${resource}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateResource<T>(
  resource: string,
  id: string,
  payload: Record<string, unknown>,
) {
  return apiRequest<T>(`/api/${resource}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteResource(resource: string, id: string) {
  return apiRequest<{ success: boolean }>(`/api/${resource}/${id}`, {
    method: "DELETE",
  });
}

export async function markAsPaid(resource: string, id: string) {
  return apiRequest<Record<string, unknown>>(`/api/${resource}/${id}/pay`, {
    method: "PATCH",
  });
}


"use client";

import {
  createResource,
  deleteResource,
  listResource,
  markAsPaid,
  updateResource,
} from "@/services/resourceService";
import type { PaginatedResponse } from "@/types/api";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseResourceState<T> {
  items: T[];
  loading: boolean;
  error: string;
  page: number;
  pageSize: number;
  total: number;
  search: string;
  setSearch: (value: string) => void;
  setPage: (page: number) => void;
  refresh: () => Promise<void>;
  createItem: (payload: Record<string, unknown>) => Promise<boolean>;
  updateItem: (id: string, payload: Record<string, unknown>) => Promise<boolean>;
  deleteItem: (id: string) => Promise<boolean>;
  payItem: (id: string) => Promise<boolean>;
}

export function useResource<T extends { id: string }>(
  resource: string,
  pageSize = 10,
): UseResourceState<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    const response = await listResource<T>(resource, { page, pageSize, search });

    if (response.error) {
      setError(response.error.message);
      setLoading(false);
      return;
    }

    const payload = response.data as PaginatedResponse<T>;
    setItems(payload.items);
    setTotal(payload.total);
    setError("");
    setLoading(false);
  }, [resource, page, pageSize, search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRows();
  }, [fetchRows]);

  const createItem = useCallback(
    async (payload: Record<string, unknown>) => {
      const result = await createResource<T>(resource, payload);
      if (result.error) {
        setError(result.error.message);
        return false;
      }
      await fetchRows();
      return true;
    },
    [resource, fetchRows],
  );

  const updateItemAction = useCallback(
    async (id: string, payload: Record<string, unknown>) => {
      const result = await updateResource<T>(resource, id, payload);
      if (result.error) {
        setError(result.error.message);
        return false;
      }
      await fetchRows();
      return true;
    },
    [resource, fetchRows],
  );

  const deleteItemAction = useCallback(
    async (id: string) => {
      const result = await deleteResource(resource, id);
      if (result.error) {
        setError(result.error.message);
        return false;
      }
      await fetchRows();
      return true;
    },
    [resource, fetchRows],
  );

  const payItemAction = useCallback(
    async (id: string) => {
      const result = await markAsPaid(resource, id);
      if (result.error) {
        setError(result.error.message);
        return false;
      }
      await fetchRows();
      return true;
    },
    [resource, fetchRows],
  );

  return useMemo(
    () => ({
      items,
      loading,
      error,
      page,
      pageSize,
      total,
      search,
      setSearch,
      setPage,
      refresh: fetchRows,
      createItem,
      updateItem: updateItemAction,
      deleteItem: deleteItemAction,
      payItem: payItemAction,
    }),
    [
      items,
      loading,
      error,
      page,
      pageSize,
      total,
      search,
      fetchRows,
      createItem,
      updateItemAction,
      deleteItemAction,
      payItemAction,
    ],
  );
}


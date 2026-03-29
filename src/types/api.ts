export interface ApiError {
  message: string;
  code?: string;
}

export interface ApiResult<T> {
  data?: T;
  error?: ApiError;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type EntityStatus = "active" | "inactive" | "pending" | "paid" | "open" | "closed" | "finalized" | "draft";


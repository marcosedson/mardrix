import { apiRequest } from "@/services/http";
import type { CashSummary } from "@/types/erp";

interface CashActionPayload {
  action: "open" | "close" | "movement";
  amount?: number;
}

export const getCashSummary = () => apiRequest<CashSummary>("/api/cash");

export const updateCash = (payload: CashActionPayload) =>
  apiRequest<CashSummary>("/api/cash", {
    method: "POST",
    body: JSON.stringify(payload),
  });


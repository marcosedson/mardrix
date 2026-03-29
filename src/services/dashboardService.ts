import { apiRequest } from "@/services/http";

export interface DashboardMetrics {
  faturamentoDia: number;
  contasReceber: number;
  contasPagar: number;
  saldoCaixa: number;
}

export interface RecentSale {
  id: string;
  customer: string;
  total: number;
  status: string;
  createdAt: string;
}

export interface DashboardResponse {
  metrics: DashboardMetrics;
  recentSales: RecentSale[];
}

export const getDashboard = () => apiRequest<DashboardResponse>("/api/dashboard");


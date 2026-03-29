import type { EntityStatus } from "@/types/api";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product extends BaseEntity {
  name: string;
  sku: string;
  barcode: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  category: string;
  status: Extract<EntityStatus, "active" | "inactive">;
}

export interface PersonBase extends BaseEntity {
  name: string;
  document: string;
  phone: string;
  email: string;
  status: Extract<EntityStatus, "active" | "inactive">;
}

export type Customer = PersonBase;
export type Supplier = PersonBase;

export interface FinancialEntry extends BaseEntity {
  description: string;
  value: number;
  dueDate: string;
  status: Extract<EntityStatus, "pending" | "paid">;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  profile: "Admin" | "Financeiro" | "Vendas";
  status: Extract<EntityStatus, "active" | "inactive">;
}

export interface ServiceOrder extends BaseEntity {
  customer: string;
  description: string;
  status: Extract<EntityStatus, "open" | "pending" | "finalized">;
  technician: string;
}

export interface ConditionalOrder extends BaseEntity {
  customer: string;
  products: string;
  returnDate: string;
  status: Extract<EntityStatus, "open" | "finalized">;
}

export interface SalesItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface SalesOrder extends BaseEntity {
  customer: string;
  status: Extract<EntityStatus, "open" | "finalized" | "draft">;
  items: SalesItem[];
  total: number;
}

export interface CashSummary {
  currentBalance: number;
  totalEntries: number;
  totalExits: number;
  isOpen: boolean;
}

export interface TenantCompany {
  id: string;
  name: string;
  branches: { id: string; name: string }[];
}


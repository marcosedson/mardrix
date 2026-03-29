import type {
  ConditionalOrder,
  Customer,
  FinancialEntry,
  Product,
  SalesOrder,
  ServiceOrder,
  Supplier,
  User,
} from "@/types/erp";

export type ResourceName =
  | "products"
  | "customers"
  | "suppliers"
  | "accounts-payable"
  | "accounts-receivable"
  | "users"
  | "service-orders"
  | "conditional-orders"
  | "sales-orders"
  | "budgets";

type GenericEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

const now = new Date().toISOString();

const products: Product[] = [
  {
    id: "prd-1",
    name: "Camisa Polo Premium",
    sku: "CAM-POLO-001",
    barcode: "7891000000001",
    costPrice: 49.9,
    salePrice: 99.9,
    stock: 24,
    category: "Roupas",
    status: "active",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "prd-2",
    name: "Calca Jeans Slim",
    sku: "CAL-JEANS-002",
    barcode: "7891000000002",
    costPrice: 79.9,
    salePrice: 159.9,
    stock: 13,
    category: "Roupas",
    status: "active",
    createdAt: now,
    updatedAt: now,
  },
];

const customers: Customer[] = [
  {
    id: "cus-1",
    name: "Ana Ribeiro",
    document: "123.456.789-00",
    phone: "(11) 98888-1111",
    email: "ana@cliente.com",
    status: "active",
    createdAt: now,
    updatedAt: now,
  },
];

const suppliers: Supplier[] = [
  {
    id: "sup-1",
    name: "Fashion Atacado",
    document: "12.345.678/0001-99",
    phone: "(11) 3777-9010",
    email: "contato@fashionatacado.com",
    status: "active",
    createdAt: now,
    updatedAt: now,
  },
];

const accountsPayable: FinancialEntry[] = [
  {
    id: "ap-1",
    description: "Fornecedor Fashion Atacado",
    value: 3200,
    dueDate: "2026-04-10",
    status: "pending",
    createdAt: now,
    updatedAt: now,
  },
];

const accountsReceivable: FinancialEntry[] = [
  {
    id: "ar-1",
    description: "Venda pedido #1234",
    value: 840,
    dueDate: "2026-04-03",
    status: "pending",
    createdAt: now,
    updatedAt: now,
  },
];

const users: User[] = [
  {
    id: "usr-1",
    name: "Admin Mardrix",
    email: "admin@mardrix.com",
    password: "123456",
    profile: "Admin",
    status: "active",
    createdAt: now,
    updatedAt: now,
  },
];

const serviceOrders: ServiceOrder[] = [
  {
    id: "srv-1",
    customer: "Ana Ribeiro",
    description: "Ajuste de barra e ziper",
    status: "open",
    technician: "Carlos Tecnico",
    createdAt: now,
    updatedAt: now,
  },
];

const conditionalOrders: ConditionalOrder[] = [
  {
    id: "con-1",
    customer: "Ana Ribeiro",
    products: "Camisa Polo Premium x1",
    returnDate: "2026-04-02",
    status: "open",
    createdAt: now,
    updatedAt: now,
  },
];

const salesOrders: SalesOrder[] = [
  {
    id: "sal-1",
    customer: "Ana Ribeiro",
    status: "finalized",
    items: [{ productId: "prd-1", productName: "Camisa Polo Premium", quantity: 1, unitPrice: 99.9 }],
    total: 99.9,
    createdAt: now,
    updatedAt: now,
  },
];

const budgets: SalesOrder[] = [
  {
    id: "bud-1",
    customer: "Ana Ribeiro",
    status: "draft",
    items: [{ productId: "prd-2", productName: "Calca Jeans Slim", quantity: 1, unitPrice: 159.9 }],
    total: 159.9,
    createdAt: now,
    updatedAt: now,
  },
];

const db: Record<ResourceName, GenericEntity[]> = {
  products: products,
  customers: customers,
  suppliers: suppliers,
  "accounts-payable": accountsPayable,
  "accounts-receivable": accountsReceivable,
  users: users,
  "service-orders": serviceOrders,
  "conditional-orders": conditionalOrders,
  "sales-orders": salesOrders,
  budgets: budgets,
};

const toSearchableText = (entry: GenericEntity) =>
  JSON.stringify(entry).toLowerCase();

export const listResource = (resource: ResourceName, search = "") => {
  const entries = db[resource] ?? [];
  if (!search.trim()) {
    return entries;
  }

  const normalized = search.trim().toLowerCase();
  return entries.filter((entry) => toSearchableText(entry).includes(normalized));
};

export const getResourceById = (resource: ResourceName, id: string) =>
  db[resource]?.find((entry) => entry.id === id);

export const createResource = (resource: ResourceName, payload: Record<string, unknown>) => {
  const timestamp = new Date().toISOString();
  const id = `${resource}-${Math.random().toString(36).slice(2, 8)}`;
  const newEntry: GenericEntity = {
    id,
    ...payload,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  db[resource].unshift(newEntry);
  return newEntry;
};

export const updateResource = (
  resource: ResourceName,
  id: string,
  payload: Record<string, unknown>,
) => {
  const index = db[resource].findIndex((entry) => entry.id === id);
  if (index < 0) {
    return undefined;
  }

  const updated: GenericEntity = {
    ...db[resource][index],
    ...payload,
    id,
    updatedAt: new Date().toISOString(),
  };

  db[resource][index] = updated;
  return updated;
};

export const deleteResource = (resource: ResourceName, id: string) => {
  const index = db[resource].findIndex((entry) => entry.id === id);
  if (index < 0) {
    return false;
  }

  db[resource].splice(index, 1);
  return true;
};

export const markAsPaid = (resource: ResourceName, id: string) => {
  return updateResource(resource, id, { status: "paid" });
};

export const isValidResource = (resource: string): resource is ResourceName =>
  resource in db;


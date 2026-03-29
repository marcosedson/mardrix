"use client";

import { useResource } from "@/hooks/useResource";
import type { Product } from "@/types/erp";

export const useProducts = () => useResource<Product>("products");


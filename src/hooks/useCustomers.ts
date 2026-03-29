"use client";

import { useResource } from "@/hooks/useResource";
import type { Customer } from "@/types/erp";

export const useCustomers = () => useResource<Customer>("customers");


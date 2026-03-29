"use client";

import type { TenantCompany } from "@/types/erp";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface TenantContextValue {
  companies: TenantCompany[];
  companyId: string;
  branchId: string;
  setCompanyId: (companyId: string) => void;
  setBranchId: (branchId: string) => void;
}

const companiesMock: TenantCompany[] = [
  {
    id: "empresa-matriz",
    name: "Mardrix Matriz",
    branches: [
      { id: "matriz", name: "Matriz" },
      { id: "centro", name: "Filial Centro" },
    ],
  },
  {
    id: "empresa-fashion",
    name: "Mardrix Fashion",
    branches: [{ id: "fashion-01", name: "Loja Fashion 01" }],
  },
];

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [companyId, setCompanyId] = useState(companiesMock[0].id);
  const [branchId, setBranchId] = useState(companiesMock[0].branches[0].id);

  useEffect(() => {
    const savedCompany = localStorage.getItem("mardrix_company");
    const savedBranch = localStorage.getItem("mardrix_branch");

    if (savedCompany) {
      setCompanyId(savedCompany);
    }

    if (savedBranch) {
      setBranchId(savedBranch);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mardrix_company", companyId);
    localStorage.setItem("mardrix_branch", branchId);
  }, [companyId, branchId]);

  const value = useMemo(
    () => ({ companies: companiesMock, companyId, branchId, setCompanyId, setBranchId }),
    [companyId, branchId],
  );

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
};

export const useTenant = () => {
  const ctx = useContext(TenantContext);
  if (!ctx) {
    throw new Error("useTenant must be used within TenantProvider");
  }

  return ctx;
};


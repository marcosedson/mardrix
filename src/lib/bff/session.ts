import { cookies } from "next/headers";

export interface TenantContext {
  companyId: string;
  branchId: string;
}

export const SESSION_COOKIE = "mardrix_token";
export const TENANT_COMPANY_COOKIE = "mardrix_company";
export const TENANT_BRANCH_COOKIE = "mardrix_branch";

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? "";
}

export async function getTenantContext(): Promise<TenantContext> {
  const cookieStore = await cookies();

  return {
    companyId: cookieStore.get(TENANT_COMPANY_COOKIE)?.value ?? "",
    branchId: cookieStore.get(TENANT_BRANCH_COOKIE)?.value ?? "",
  };
}


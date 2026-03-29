import { listResource, markAsPaid } from "@/services/resourceService";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { installMockBffFetch } from "./mockBffServer";

describe("critical flow: contas a pagar/receber", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    installMockBffFetch();
  });

  it("marca contas a pagar como pagas", async () => {
    const beforePayable = await listResource<{ id: string; status: string }>(
      "accounts-payable",
      { page: 1, pageSize: 10, search: "" },
    );

    const payableId = beforePayable.data?.items[0]?.id ?? "";
    const paid = await markAsPaid("accounts-payable", payableId);

    expect(paid.data?.status).toBe("paid");
  });

  it("marca contas a receber como pagas", async () => {
    const beforeReceivable = await listResource<{ id: string; status: string }>(
      "accounts-receivable",
      { page: 1, pageSize: 10, search: "" },
    );

    const receivableId = beforeReceivable.data?.items[0]?.id ?? "";
    const paid = await markAsPaid("accounts-receivable", receivableId);

    expect(paid.data?.status).toBe("paid");
  });
});


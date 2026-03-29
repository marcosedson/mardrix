import {
  createResource,
  deleteResource,
  listResource,
  updateResource,
} from "@/services/resourceService";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { installMockBffFetch } from "./mockBffServer";

describe("critical flow: products CRUD", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    installMockBffFetch();
  });

  it("lista, cria, atualiza e remove produto", async () => {
    const listBefore = await listResource<{ id: string; name: string }>("products", {
      page: 1,
      pageSize: 10,
      search: "",
    });
    expect(listBefore.data?.total).toBe(1);

    const created = await createResource<{ id: string; name: string }>("products", {
      name: "Produto Teste",
      sku: "PRD-TST-001",
      salePrice: 50,
      stock: 8,
      status: "active",
    });
    expect(created.data?.id).toBe("products-new");

    const updated = await updateResource<{ id: string; status: string }>(
      "products",
      "products-new",
      { status: "inactive" },
    );
    expect(updated.data?.status).toBe("inactive");

    const removed = await deleteResource("products", "products-new");
    expect(removed.data?.success).toBe(true);
  });
});


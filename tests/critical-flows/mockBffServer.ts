import { vi } from "vitest";

type Entity = Record<string, unknown> & { id: string };

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export function installMockBffFetch() {
  const resources: Record<string, Entity[]> = {
    products: [
      {
        id: "prd-1",
        name: "Camisa Polo Premium",
        sku: "CAM-POLO-001",
        salePrice: 99.9,
        stock: 24,
        status: "active",
      },
    ],
    "accounts-payable": [
      {
        id: "ap-1",
        description: "Fornecedor X",
        value: 100,
        dueDate: "2026-04-10",
        status: "pending",
      },
    ],
    "accounts-receivable": [
      {
        id: "ar-1",
        description: "Venda X",
        value: 200,
        dueDate: "2026-04-12",
        status: "pending",
      },
    ],
  };

  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);

    if (url === "/api/login" && (init?.method ?? "GET") === "POST") {
      const payload = JSON.parse(String(init?.body ?? "{}")) as {
        email?: string;
        password?: string;
      };

      if (payload.email === "admin@mardrix.com" && payload.password === "123456") {
        return new Response(
          JSON.stringify({ token: "token-ok", user: { email: payload.email } }),
          { status: 200 },
        );
      }

      return new Response(JSON.stringify({ message: "Credenciais invalidas" }), {
        status: 401,
      });
    }

    const match = url.match(/^\/api\/([^/?]+)(?:\/([^/?]+))?(?:\/pay)?(?:\?.*)?$/);
    if (!match) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    const resource = match[1];
    const id = match[2];
    const isPayRoute = url.includes("/pay");
    const method = (init?.method ?? "GET").toUpperCase();

    if (!(resource in resources)) {
      return new Response(JSON.stringify({ message: "Resource not found" }), {
        status: 404,
      });
    }

    if (method === "GET" && !id) {
      const rows = resources[resource];
      return new Response(
        JSON.stringify({ items: clone(rows), total: rows.length, page: 1, pageSize: 10 }),
        { status: 200 },
      );
    }

    if (method === "POST" && !id) {
      const payload = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
      const created = { id: `${resource}-new`, ...payload } as Entity;
      resources[resource].push(created);
      return new Response(JSON.stringify(created), { status: 201 });
    }

    if (method === "PUT" && id) {
      const payload = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
      const index = resources[resource].findIndex((item) => item.id === id);
      if (index < 0) {
        return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
      }
      resources[resource][index] = { ...resources[resource][index], ...payload };
      return new Response(JSON.stringify(clone(resources[resource][index])), { status: 200 });
    }

    if (method === "PATCH" && id && isPayRoute) {
      const index = resources[resource].findIndex((item) => item.id === id);
      if (index < 0) {
        return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
      }
      resources[resource][index] = { ...resources[resource][index], status: "paid" };
      return new Response(JSON.stringify(clone(resources[resource][index])), { status: 200 });
    }

    if (method === "DELETE" && id) {
      const index = resources[resource].findIndex((item) => item.id === id);
      if (index < 0) {
        return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
      }
      resources[resource].splice(index, 1);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Unsupported" }), { status: 400 });
  });

  global.fetch = fetchMock as typeof fetch;

  return {
    resources,
    fetchMock,
  };
}


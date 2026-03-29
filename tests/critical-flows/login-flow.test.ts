import { login } from "@/services/authService";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { installMockBffFetch } from "./mockBffServer";

describe("critical flow: login", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    installMockBffFetch();
  });

  it("realiza login com credenciais validas", async () => {
    const result = await login({
      email: "admin@mardrix.com",
      password: "123456",
    });

    expect(result.error).toBeUndefined();
    expect(result.data?.token).toBe("token-ok");
    expect(result.data?.user.email).toBe("admin@mardrix.com");
  });

  it("retorna erro para credenciais invalidas", async () => {
    const result = await login({
      email: "admin@mardrix.com",
      password: "senha-invalida",
    });

    expect(result.data).toBeUndefined();
    expect(result.error?.message).toBe("Credenciais invalidas");
  });
});


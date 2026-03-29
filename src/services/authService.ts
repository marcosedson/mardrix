import { apiRequest } from "@/services/http";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    email: string;
  };
}

export const login = (payload: LoginPayload) =>
  apiRequest<LoginResponse>("/api/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });


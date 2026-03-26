import { z } from "zod";

export const cadastroTenantSchema = z.object({
  nomeEmpresa: z.string().min(2, "Informe o nome da empresa"),
  cnpj: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => {
        if (!v) return true;
        const digits = v.replace(/\D/g, "");
        return digits.length === 14;
      },
      { message: "CNPJ inválido (precisa ter 14 dígitos)" }
    ),
  nomeUsuario: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type CadastroTenantInput = z.infer<typeof cadastroTenantSchema>;


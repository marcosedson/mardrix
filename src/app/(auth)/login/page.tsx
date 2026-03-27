"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginWithEmail, resetPassword } from "@/lib/firebase/auth";
import { DEV_AUTH_ENABLED, DEV_AUTH_EMAIL, DEV_AUTH_PASSWORD } from "@/lib/dev-auth";
import { useAuth } from "@/components/auth/auth-provider";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  senha: z.string().min(6, "Senha inválida"),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [resetLoading, setResetLoading] = useState(false);
  const { devLogin } = useAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", senha: "" },
    mode: "onSubmit",
  });

  async function onSubmit(values: LoginInput) {
    try {
      if (DEV_AUTH_ENABLED && devLogin) {
        await devLogin(values.email, values.senha);
      } else {
        await loginWithEmail(values.email, values.senha);
      }
      toast.success("Login realizado");
      router.replace("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Não foi possível entrar";
      toast.error("Falha no login", { description: msg });
    }
  }

  async function onReset() {
    const email = form.getValues("email");
    if (!email) {
      form.setError("email", { message: "Informe o e-mail para recuperar" });
      return;
    }
    setResetLoading(true);
    try {
      await resetPassword(email);
      toast.success("Enviamos um e-mail de recuperação");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Falha ao enviar e-mail";
      toast.error("Não foi possível enviar", { description: msg });
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <AuthShell
      title="Entre no Mardrix"
      description="Gestão rápida e bonita: estoque, vendas, compras, financeiro e etiquetas em lote — tudo em um só lugar."
      footer={
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            Não tem conta?{" "}
            <Link href="/cadastro" className="underline underline-offset-4">
              Criar agora
            </Link>
          </p>

          {DEV_AUTH_ENABLED ? (
            <p className="text-[11px] text-muted-foreground">
              Dev auth ativo:{" "}
              <span className="font-medium">{DEV_AUTH_EMAIL}</span> /{" "}
              <span className="font-medium">{DEV_AUTH_PASSWORD}</span>
            </p>
          ) : null}
        </div>
      }
    >
      <Card className="glass border-border/60">
        <CardHeader>
          <CardTitle className="text-xl">Entrar</CardTitle>
          <p className="text-sm text-muted-foreground">
            Use seu e-mail e senha para continuar.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="voce@empresa.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={form.formState.isSubmitting} className="bg-brand-gradient-hover text-white border-0 shadow-lg shadow-primary/20 h-11 font-bold">
                {form.formState.isSubmitting ? "Entrando…" : "Entrar"}
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={onReset}
                disabled={resetLoading}
              >
                {resetLoading ? "Enviando…" : "Esqueci minha senha"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AuthShell>
  );
}

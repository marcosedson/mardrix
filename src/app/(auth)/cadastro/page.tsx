"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpWithEmail } from "@/lib/firebase/auth";
import {
  cadastroTenantSchema,
  type CadastroTenantInput,
} from "@/lib/validators/cadastro-tenant";

export default function CadastroPage() {
  const router = useRouter();

  const form = useForm<CadastroTenantInput>({
    resolver: zodResolver(cadastroTenantSchema),
    defaultValues: {
      nomeEmpresa: "",
      cnpj: "",
      nomeUsuario: "",
      email: "",
      senha: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: CadastroTenantInput) {
    try {
      const user = await signUpWithEmail(values.email, values.senha);
      const idToken = await user.getIdToken();

      const res = await fetch("/api/auth/onboarding", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          nomeEmpresa: values.nomeEmpresa,
          cnpj: values.cnpj,
          nomeUsuario: values.nomeUsuario,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `HTTP ${res.status}`);
      }

      // No futuro: o backend seta custom claims e devolve ok.
      // Força refresh do token para puxar claims novas.
      await user.getIdToken(true);

      toast.success("Conta criada");
      router.replace("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Falha no cadastro";
      toast.error("Não foi possível criar a conta", { description: msg });
    }
  }

  return (
    <AuthShell
      title="Crie sua empresa no Mardrix"
      description="Você cria o tenant agora e já entra no dashboard. Leva menos de 1 minuto."
      footer={
        <p className="text-xs text-muted-foreground">
          Já tem conta?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Entrar
          </Link>
        </p>
      }
    >
      <Card className="glass border-border/60">
        <CardHeader>
          <CardTitle className="text-xl">Cadastro</CardTitle>
          <p className="text-sm text-muted-foreground">
            Crie sua conta e configure sua empresa.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="nomeEmpresa"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Nome da empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Minha Empresa LTDA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="00.000.000/0000-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div />

                <FormField
                  control={form.control}
                  name="nomeUsuario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Marcos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                    <FormItem className="md:col-span-2">
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Criando…" : "Criar conta"}
              </Button>

              <p className="text-xs text-muted-foreground">
                Ao continuar, você concorda com os termos de uso e política de privacidade.
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AuthShell>
  );
}

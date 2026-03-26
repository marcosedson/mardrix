"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
  cadastroTenantSchema,
  type CadastroTenantInput,
} from "@/lib/validators/cadastro-tenant";

export default function CadastroPage() {
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

  function onSubmit(values: CadastroTenantInput) {
    // Placeholder: nesta fase ainda não integramos Firebase e API.
    // Aqui vai:
    // 1) criar usuário no Firebase
    // 2) chamar BFF /api/auth para criar tenant e setar custom claims
    console.log(values);
  }

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Cadastro da empresa</CardTitle>
          <p className="text-sm text-muted-foreground">
            Onboarding simples. Depois este fluxo cria o tenant e vincula o
            usuário (owner) via Firebase custom claims.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4"
            >
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

              <Button type="submit" className="w-full">
                Criar conta
              </Button>

              <p className="text-xs text-muted-foreground">
                Ao continuar, você concorda com os termos de uso e política de
                privacidade (placeholder).
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

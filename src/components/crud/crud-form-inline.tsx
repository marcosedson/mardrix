"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, type Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CrudSelectField } from "@/components/crud/crud-select-field";
import { CrudSwitchField } from "@/components/crud/crud-switch-field";
import { type CrudField } from "@/components/crud/crud-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";

async function fetchCep(cep: string) {
  const cleanCep = cep.replace(/\D/g, "");
  if (cleanCep.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json();
    if (data.erro) return null;
    return data;
  } catch (e) {
    return null;
  }
}

export function CrudFormInline<TSchema extends z.ZodTypeAny>(props: {
  title: string;
  schema: TSchema;
  defaultValues: z.input<TSchema>;
  fields: CrudField[];
  submitLabel: string;
  onSubmit: (values: z.output<TSchema>) => Promise<boolean> | boolean;
  onCancel: () => void;
  isSubmitting?: boolean;
}) {
  const {
    title,
    schema,
    defaultValues,
    fields,
    submitLabel,
    onSubmit,
    onCancel,
    isSubmitting,
  } = props;

  const form = useForm<z.input<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [isSearchingCep, setIsSearchingCep] = useState(false);

  const handleCepSearch = async (cep: string) => {
    if (cep.length < 8) return;
    setIsSearchingCep(true);
    const data = await fetchCep(cep);
    setIsSearchingCep(false);
    if (data) {
      form.setValue("logradouro" as any, data.logradouro);
      form.setValue("bairro" as any, data.bairro);
      form.setValue("cidade" as any, data.localidade);
      form.setValue("estado" as any, data.uf);
      toast.success("Endereço preenchido automaticamente");
    } else {
      toast.error("CEP não encontrado");
    }
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <Card className="border-primary/20 shadow-xl shadow-primary/5">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="ghost" size="icon-sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              const ok = await onSubmit(values as unknown as z.output<TSchema>);
              if (ok) onCancel();
            })}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {fields.map((f) => {
              if (f.kind === "select") {
                return (
                  <CrudSelectField
                    key={f.name}
                    control={form.control}
                    name={f.name as unknown as Path<z.input<TSchema>>}
                    label={f.label}
                    placeholder={f.placeholder}
                    options={f.options}
                  />
                );
              }

              if (f.kind === "switch") {
                return (
                  <div key={f.name} className="flex items-end pb-2">
                    <CrudSwitchField
                      control={form.control}
                      name={f.name as unknown as Path<z.input<TSchema>>}
                      label={f.label}
                      description={f.description}
                    />
                  </div>
                );
              }

              if (f.kind === "checkbox") {
                return (
                  <FormField
                    key={f.name}
                    control={form.control}
                    name={f.name as Path<z.input<TSchema>>}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>{f.label}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                );
              }

              if (f.kind === "textarea") {
                return (
                  <FormField
                    key={f.name}
                    control={form.control}
                    name={f.name as Path<z.input<TSchema>>}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2 lg:col-span-3">
                        <FormLabel>{f.label}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder={f.placeholder}
                            className="bg-background min-h-[100px]"
                            value={(field.value ?? "") as string}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              }

              return (
                <FormField
                  key={f.name}
                  control={form.control}
                  name={f.name as Path<z.input<TSchema>>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{f.label}</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={f.type ?? "text"}
                            placeholder={f.placeholder}
                            value={(field.value ?? "") as string}
                            className={cn(
                              "bg-background transition-all focus-visible:ring-primary",
                              f.name === "cep" && "pr-10"
                            )}
                          />
                        </FormControl>
                        {f.name === "cep" && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                            onClick={() => handleCepSearch(field.value as string)}
                            disabled={isSearchingCep}
                          >
                            {isSearchingCep ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Search className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

            <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-3 pt-4 border-t border-border/50">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                {submitLabel}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

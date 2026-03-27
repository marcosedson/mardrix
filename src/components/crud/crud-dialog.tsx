"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { z } from "zod";
import { useForm, type Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CrudSelectField, type CrudSelectOption } from "@/components/crud/crud-select-field";
import { CrudSwitchField } from "@/components/crud/crud-switch-field";

export type CrudField = {
  name: string;
  label: string;
  placeholder?: string;
} & (
  | {
      kind?: "input";
      type?: React.HTMLInputTypeAttribute;
    }
  | {
      kind: "select";
      options: CrudSelectOption[];
    }
  | {
      kind: "switch";
      description?: string;
    }
  | {
      kind: "textarea";
    }
  | {
      kind: "checkbox";
    }
);

export function CrudDialog<TSchema extends z.ZodTypeAny>(props: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  schema: TSchema;
  defaultValues: z.input<TSchema>;
  fields: CrudField[];
  submitLabel: string;
  onSubmit: (values: z.output<TSchema>) => Promise<boolean> | boolean;
  isSubmitting?: boolean;
}) {
  const {
    open,
    onOpenChange,
    title,
    description,
    schema,
    defaultValues,
    fields,
    submitLabel,
    onSubmit,
    isSubmitting,
  } = props;

  const form = useForm<z.input<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (open) form.reset(defaultValues);
  }, [open, defaultValues, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              const ok = await onSubmit(values as unknown as z.output<TSchema>);
              if (ok) onOpenChange(false);
            })}
            className="space-y-4"
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
                  <CrudSwitchField
                    key={f.name}
                    control={form.control}
                    name={f.name as unknown as Path<z.input<TSchema>>}
                    label={f.label}
                    description={f.description}
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
                      <FormControl>
                        <Input
                          {...field}
                          type={f.type ?? "text"}
                          placeholder={f.placeholder}
                          value={(field.value ?? "") as string}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}

            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {submitLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

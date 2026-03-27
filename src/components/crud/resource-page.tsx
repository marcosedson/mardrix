"use client";

import { useMemo, useState } from "react";
import type { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CrudField } from "@/components/crud/crud-dialog";
import { CrudFormInline } from "@/components/crud/crud-form-inline";
import { ConfirmDeleteDialog } from "@/components/crud/confirm-delete-dialog";
import { Plus } from "lucide-react";
import {
  useCrudCreate,
  useCrudDelete,
  useCrudList,
  useCrudUpdate,
} from "@/hooks/crud/use-crud-resource";

export type CrudItemBase = { id: string; created_at?: string; updated_at?: string };

export function ResourcePage<TItem extends CrudItemBase, TSchema extends z.ZodTypeAny>(props: {
  title: string;
  resource: string;
  schema: TSchema;
  fields: CrudField[];
  // quais campos mostrar na tabela
  columns: Array<{ key: keyof TItem; header: string; render?: (item: TItem) => React.ReactNode }>;
  defaultValues: z.input<TSchema>;
}) {
  const { title, resource, schema, fields, columns, defaultValues } = props;

  const listQuery = useCrudList<TItem>(resource);
  const createMut = useCrudCreate<z.input<TSchema>, TItem>(resource);
  const updateMut = useCrudUpdate<z.input<TSchema>, TItem>(resource);
  const deleteMut = useCrudDelete(resource);

  const items = listQuery.data?.items ?? [];

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<TItem | null>(null);

  const editDefaults = useMemo((): z.input<TSchema> => {
    if (!selected) return defaultValues;
    return {
      ...(defaultValues as unknown as Record<string, unknown>),
      ...(selected as unknown as Record<string, unknown>),
    } as z.input<TSchema>;
  }, [selected, defaultValues]);

  function getErrorMessage(err: unknown): string {
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    return "Erro inesperado";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie seus registros de {title.toLowerCase()} de forma eficiente.
          </p>
        </div>

        {!isAdding && !editingId && (
          <Button 
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-[#1E40AF] to-[#6D28D9] hover:opacity-90 transition-opacity"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Registro
          </Button>
        )}
      </div>

      {isAdding && (
        <CrudFormInline
          title={`Novo — ${title}`}
          schema={schema}
          defaultValues={defaultValues}
          fields={fields}
          submitLabel={createMut.isPending ? "Criando…" : "Criar"}
          isSubmitting={createMut.isPending}
          onCancel={() => setIsAdding(false)}
          onSubmit={async (values) => {
            try {
              await createMut.mutateAsync(values as unknown as z.input<TSchema>);
              toast.success("Criado com sucesso");
              return true;
            } catch (err) {
              toast.error("Falha ao criar", { description: getErrorMessage(err) });
              return false;
            }
          }}
        />
      )}

      {editingId && selected && (
        <CrudFormInline
          title={`Editar — ${title}`}
          schema={schema}
          defaultValues={editDefaults}
          fields={fields}
          submitLabel={updateMut.isPending ? "Salvando…" : "Salvar"}
          isSubmitting={updateMut.isPending}
          onCancel={() => {
            setEditingId(null);
            setSelected(null);
          }}
          onSubmit={async (values) => {
            try {
              await updateMut.mutateAsync({
                id: selected.id,
                input: values as unknown as z.input<TSchema>,
              });
              toast.success("Salvo com sucesso");
              return true;
            } catch (err) {
              toast.error("Falha ao salvar", { description: getErrorMessage(err) });
              return false;
            }
          }}
        />
      )}

      {listQuery.isError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Ocorreu um erro ao carregar os dados. Por favor, tente novamente.
        </div>
      ) : null}

      {!isAdding && !editingId && (
        <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                {columns.map((c) => (
                  <TableHead key={String(c.key)} className="font-bold py-4">{c.header}</TableHead>
                ))}
                <TableHead className="w-44 text-right font-bold py-4">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listQuery.isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="h-32 text-center text-muted-foreground">
                    Carregando registros…
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="h-32 text-center text-muted-foreground">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((it) => (
                  <TableRow key={it.id} className="hover:bg-muted/30 transition-colors">
                    {columns.map((c) => (
                      <TableCell key={String(c.key)} className="py-4">
                        {c.render
                          ? c.render(it)
                          : String(
                              (it as unknown as Record<string, unknown>)[
                                String(c.key)
                              ] ?? ""
                            )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelected(it);
                            setEditingId(it.id);
                          }}
                          className="hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelected(it);
                            setDeleteOpen(true);
                          }}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          Excluir
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <ConfirmDeleteDialog
        open={deleteOpen}
        onOpenChange={(v) => {
          setDeleteOpen(v);
          if (!v) setSelected(null);
        }}
        title="Confirmar exclusão"
        description={selected ? `Excluir o registro ${selected.id}?` : undefined}
        isDeleting={deleteMut.isPending}
        onConfirm={async () => {
          if (!selected) return;
          try {
            await deleteMut.mutateAsync(selected.id);
            toast.success("Excluído com sucesso");
          } catch (err) {
            toast.error("Falha ao excluir", { description: getErrorMessage(err) });
            throw err;
          }
        }}
      />
    </div>
  );
}


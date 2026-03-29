"use client";

import ComponentCard from "@/components/common/ComponentCard";
import CrudModal from "@/components/common/CrudModal";
import DataTable from "@/components/common/DataTable";
import ErrorState from "@/components/common/ErrorState";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SkeletonTable from "@/components/common/SkeletonTable";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { useResource } from "@/hooks/useResource";
import React, { useMemo, useState } from "react";

type FieldType = "text" | "number" | "email" | "password" | "date" | "select";

interface FieldConfig {
  name: string;
  label: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
}

interface ResourceCrudPageProps {
  pageTitle: string;
  resource: string;
  columns: { key: string; label: string }[];
  fields: FieldConfig[];
  createLabel?: string;
  showPayAction?: boolean;
}

export default function ResourceCrudPage({
  pageTitle,
  resource,
  columns,
  fields,
  createLabel = "Novo",
  showPayAction = false,
}: ResourceCrudPageProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const {
    items,
    loading,
    error,
    page,
    pageSize,
    total,
    search,
    setSearch,
    setPage,
    createItem,
    updateItem,
    deleteItem,
    payItem,
    refresh,
  } = useResource<Record<string, unknown> & { id: string; status?: string }>(resource);

  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [editingId, setEditingId] = useState<string>("");

  const modalTitle = editingId ? `Editar ${pageTitle}` : `${createLabel} ${pageTitle}`;

  const tableColumns = useMemo(
    () => columns.map((column) => ({ key: column.key, label: column.label })),
    [columns],
  );

  const handleOpenCreate = () => {
    setEditingId("");
    setDraft({});
    openModal();
  };

  const handleOpenEdit = (item: Record<string, unknown> & { id: string }) => {
    setEditingId(item.id);
    setDraft(item);
    openModal();
  };

  const handleSave = async () => {
    const success = editingId
      ? await updateItem(editingId, draft)
      : await createItem({ ...draft, status: draft.status ?? "active" });

    if (success) {
      closeModal();
    }
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle={pageTitle} />
      <ComponentCard title={pageTitle}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Input
            key={`${resource}-${search}`}
            placeholder="Buscar"
            defaultValue={search}
            onChange={(event) => setSearch(event.target.value)}
            className="max-w-[320px]"
          />
          <Button onClick={handleOpenCreate}>{createLabel}</Button>
        </div>

        {error && <ErrorState message={error} onRetry={refresh} />}
        {loading ? (
          <SkeletonTable />
        ) : (
          <DataTable
            columns={tableColumns}
            rows={items}
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            actions={(row) => (
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => handleOpenEdit(row)}>
                  Editar
                </Button>
                {showPayAction && row.status !== "paid" && (
                  <Button size="sm" onClick={() => payItem(row.id)}>
                    Marcar pago
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => deleteItem(row.id)}>
                  Excluir
                </Button>
              </div>
            )}
          />
        )}
      </ComponentCard>

      <CrudModal isOpen={isOpen} onClose={closeModal} onConfirm={handleSave} title={modalTitle}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <div key={`${field.name}-${editingId}`}>
              <Label>{field.label}</Label>
              {field.type === "select" ? (
                <Select
                  key={`${field.name}-${String(draft[field.name] ?? "")}`}
                  options={field.options ?? []}
                  defaultValue={String(draft[field.name] ?? "")}
                  placeholder={`Selecione ${field.label}`}
                  onChange={(value) =>
                    setDraft((prev) => ({
                      ...prev,
                      [field.name]: value,
                    }))
                  }
                />
              ) : (
                <Input
                  type={field.type ?? "text"}
                  defaultValue={String(draft[field.name] ?? "")}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      [field.name]:
                        field.type === "number"
                          ? Number(event.target.value)
                          : event.target.value,
                    }))
                  }
                />
              )}
            </div>
          ))}
        </div>
      </CrudModal>
    </div>
  );
}


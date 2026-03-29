import Pagination from "@/components/tables/Pagination";
import Badge from "@/components/ui/badge/Badge";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string; status?: string }> {
  columns: Column<T>[];
  rows: T[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  actions?: (row: T) => React.ReactNode;
}

const statusColor = (status?: string): "success" | "warning" | "error" | "primary" => {
  if (!status) return "primary";
  if (["active", "paid", "finalized"].includes(status)) return "success";
  if (["pending", "open", "draft"].includes(status)) return "warning";
  return "error";
};

export default function DataTable<T extends { id: string; status?: string }>({
  columns,
  rows,
  page,
  pageSize,
  total,
  onPageChange,
  actions,
}: DataTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    {column.label}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                  >
                    Acoes
                  </TableCell>
                )}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => {
                    const raw = row[column.key as keyof T];
                    if (column.render) {
                      return (
                        <TableCell key={String(column.key)} className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                          {column.render(row)}
                        </TableCell>
                      );
                    }

                    if (column.key === "status") {
                      return (
                        <TableCell key={String(column.key)} className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                          <Badge size="sm" color={statusColor(String(raw))}>
                            {String(raw)}
                          </Badge>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={String(column.key)} className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                        {String(raw ?? "-")}
                      </TableCell>
                    );
                  })}
                  {actions && <TableCell className="px-5 py-4">{actions(row)}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}


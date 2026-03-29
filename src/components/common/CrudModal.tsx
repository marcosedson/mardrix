"use client";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import React from "react";

interface CrudModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  children: React.ReactNode;
}

export default function CrudModal({
  isOpen,
  title,
  onClose,
  onConfirm,
  confirmLabel = "Salvar",
  children,
}: CrudModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[720px] p-6 m-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">{title}</h3>
      <div className="space-y-4">{children}</div>
      <div className="mt-6 flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}


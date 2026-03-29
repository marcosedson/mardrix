import React from "react";

export default function LoadingState({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
      {label}
    </div>
  );
}


import React from "react";

export default function SkeletonTable({ rows = 6 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="animate-pulse space-y-3 p-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="h-10 rounded-lg bg-gray-100 dark:bg-white/10" />
        ))}
      </div>
    </div>
  );
}


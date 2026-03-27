"use client";

import { useEffect } from "react";

let loaded = false;

export function BootstrapScope({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (loaded) return;
    loaded = true;
    // Carrega o CSS do Bootstrap apenas no client.
    void import("bootstrap/dist/css/bootstrap.min.css");
  }, []);

  return <div className="bs-scope">{children}</div>;
}


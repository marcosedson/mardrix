"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

import { AuthProvider } from "@/components/auth/auth-provider";
import { initAnalytics } from "@/lib/firebase/analytics";
import { SidebarProvider } from "@/context/SidebarContext";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    void initAnalytics();
  }, []);

  return (
    <ThemeProvider {...{ attribute: "class", defaultTheme: "system", enableSystem: true } as any}>
      <AuthProvider>
        <SidebarProvider>
          <QueryClientProvider client={queryClient}>{children as any}</QueryClientProvider>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

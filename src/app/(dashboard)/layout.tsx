"use client";

import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { Toaster } from "@/components/ui/sonner";
import { RequireAuth } from "@/components/auth/require-auth";
import { useSidebar } from "@/context/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered } = useSidebar();

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <AppSidebar />
        <Backdrop />
        
        <div
          className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
            isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          }`}
        >
          <AppHeader />
          <main className="p-4 md:p-6">
            <div className="mx-auto max-w-screen-2xl">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </RequireAuth>
  );
}

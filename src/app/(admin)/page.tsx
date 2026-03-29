import type { Metadata } from "next";
import DashboardHome from "@/modules/dashboard/components/DashboardHome";
import React from "react";

export const metadata: Metadata = {
  title: "Mardrix ERP | Dashboard",
  description: "Visao geral do ERP Mardrix",
};

export default function Ecommerce() {
  return <DashboardHome />;
}

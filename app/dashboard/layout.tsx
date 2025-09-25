import { ReactNode } from "react";
import { redirect } from "next/navigation";

import DashboardShell from "@/components/dashboard/DashboardShell";
import { getCurrentUser } from "@/lib/auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}

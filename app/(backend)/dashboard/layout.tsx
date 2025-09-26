import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import DashboardShell from "@/components/dashboard/DashboardShell";
import { authOptions } from "@/backend/auth/options";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  const user = session?.user ?? null;

  if (!user) {
    redirect("/");
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}

import { redirect } from "next/navigation";

import DashboardView from "@/components/dashboard/DashboardView";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return <DashboardView userName={user.name ?? user.email} />;
}
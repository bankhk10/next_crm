import { redirect } from "next/navigation";

import DashboardView from "@/components/dashboard/DashboardView";
import { getCurrentUser } from "@/lib/auth";

export default async function FollowUpsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <DashboardView
      userName={user.name ?? user.email}
      placeholder={{
        title: "ติดตามผล",
        subtitle: "วางแผนการติดต่อและติดตามกิจกรรมกับลูกค้า",
        message: "ระบบติดตามผลจะเปิดให้ใช้งานเมื่อการตั้งค่าเสร็จสมบูรณ์",
      }}
    />
  );
}

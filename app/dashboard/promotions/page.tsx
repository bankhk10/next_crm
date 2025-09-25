import { redirect } from "next/navigation";

import DashboardView from "@/components/dashboard/DashboardView";
import { getCurrentUser } from "@/lib/auth";

export default async function PromotionsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <DashboardView
      userName={user.name ?? user.email}
      placeholder={{
        title: "โปรโมชั่น",
        subtitle: "วางแผนและติดตามผลลัพธ์ของแคมเปญการตลาด",
        message: "พื้นที่จัดการโปรโมชั่นจะพร้อมใช้งานในไม่ช้า",
      }}
    />
  );
}

import { redirect } from "next/navigation";

import DashboardView from "@/components/dashboard/DashboardView";
import { getCurrentUser } from "@/lib/auth";

export default async function OrdersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <DashboardView
      userName={user.name ?? user.email}
      placeholder={{
        title: "คำสั่งซื้อ",
        subtitle: "ตรวจสอบคำสั่งซื้อ การจัดส่ง และการชำระเงิน",
        message: "หน้าสรุปรายการคำสั่งซื้อจะพร้อมใช้งานในเวอร์ชันถัดไป",
      }}
    />
  );
}

import { redirect } from "next/navigation";

import DashboardView from "@/components/dashboard/DashboardView";
import { getCurrentUser } from "@/lib/auth";

export default async function CustomersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <DashboardView
      userName={user.name ?? user.email}
      placeholder={{
        title: "ฐานข้อมูลลูกค้า",
        subtitle: "จัดการรายชื่อลูกค้าและข้อมูลสำคัญของลูกค้าทั้งหมด",
        message: "ฟีเจอร์บริหารฐานข้อมูลลูกค้าจะพร้อมให้ใช้งานเร็ว ๆ นี้",
      }}
    />
  );
}

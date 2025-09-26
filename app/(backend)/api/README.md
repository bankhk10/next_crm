พื้นที่สำหรับโค้ดฝั่งหลังบ้าน (Back-office) ที่ให้บริการ API ด้วย Next.js App Router
route handlers และ NextAuth

แนวทาง:

- เก็บ route handler ของ REST API ไว้ในโฟลเดอร์ย่อยพร้อมไฟล์ `route.ts` ตามโครงสร้าง App Router
- เก็บไฟล์ตั้งค่าการพิสูจน์ตัวตนไว้ในโฟลเดอร์ `backend/auth` (เช่น `options.ts`)
- ใช้ NextAuth ผ่าน `app/(backend)/api/auth/[...nextauth]/route.ts` เพื่อจัดการการเข้าสู่ระบบ
- หากต้องสร้าง server action เพิ่มเติมให้วางไว้ภายใต้โครงสร้างหลังบ้านนี้เพื่อไม่ให้ปะปนกับฝั่งหน้าเว็บไซต์

ตัวอย่าง:

- `app/(backend)/api/auth/[...nextauth]/route.ts` - เส้นทาง NextAuth สำหรับจัดการ sign-in / sign-out
- `app/(backend)/api/customers/route.ts` - REST handler ที่ตอบข้อมูลลูกค้า

โครงสร้างนี้ช่วยให้แยกโค้ดหน้าบ้าน-หลังบ้านชัดเจน และค้นหา endpoint ที่เกี่ยวข้องได้ง่าย

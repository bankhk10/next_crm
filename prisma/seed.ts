import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("P@ssw0rd123", 12);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      name: "ผู้ดูแลระบบ",
      passwordHash,
    },
    create: {
      email: "admin@example.com",
      name: "ผู้ดูแลระบบ",
      passwordHash,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
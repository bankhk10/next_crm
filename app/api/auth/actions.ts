"use server";

import { prisma } from "@/lib/prisma";
import { endUserSession, startUserSession } from "@/lib/auth";
import { compare } from "bcryptjs";
import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
  values?: {
    email?: string;
  };
};

const INVALID_MESSAGE = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const persistent = formData.get("remember") === "on";

  if (!email || !password) {
    return {
      error: "กรุณากรอกอีเมลและรหัสผ่าน",
      values: { email },
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      error: INVALID_MESSAGE,
      values: { email },
    };
  }

  const passwordValid = await compare(password, user.passwordHash);

  if (!passwordValid) {
    return {
      error: INVALID_MESSAGE,
      values: { email },
    };
  }

  await startUserSession(user.id, { persistent });

  redirect("/dashboard");
}

export async function logout() {
  await endUserSession();
  redirect("/");
}

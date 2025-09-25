import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import type { SessionUser } from "@/lib/authTypes";

const SESSION_COOKIE_NAME = "next-crm-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const SESSION_EXTENDED_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getSecretKey(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ?? (process.env.NODE_ENV === "production" ? undefined : "development-secret");

  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not defined.");
  }

  return new TextEncoder().encode(secret);
}

async function createSessionToken(userId: string, maxAge: number) {
  const secret = getSecretKey();
  return await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${maxAge}s`)
    .sign(secret);
}

async function verifySessionToken(token: string) {
  const secret = getSecretKey();
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    if (!payload.sub || typeof payload.sub !== "string") {
      return null;
    }

    return payload.sub;
  } catch {
    return null;
  }
}

// SessionUser type is imported from lib/authTypes

export async function startUserSession(
  userId: string,
  options?: {
    persistent?: boolean;
  },
) {
  const cookieStore = await cookies();
  const maxAge = options?.persistent ? SESSION_EXTENDED_MAX_AGE : SESSION_MAX_AGE;
  const token = await createSessionToken(userId, maxAge);

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge,
    path: "/",
  });
}

export async function endUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const userId = await verifySessionToken(token);

  if (!userId) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (!user) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    return null;
  }

  return user;
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE, SESSION_EXTENDED_MAX_AGE };
import { endUserSession } from "@/lib/auth";

export async function GET() {
  await endUserSession();
  return new Response(null, {
    status: 302,
    headers: { Location: "/" },
  });
}

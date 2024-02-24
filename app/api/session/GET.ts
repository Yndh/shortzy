import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function mGET(req: Request, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse(
      JSON.stringify({ error: "The user is not authenticated" }),
      {
        status: 401,
      }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return new NextResponse(
      JSON.stringify({ exists: false, error: "User does not exist" }),
      {
        status: 400,
      }
    );
  }

  return new NextResponse(JSON.stringify({ exists: true }), {
    status: 200,
  });
}

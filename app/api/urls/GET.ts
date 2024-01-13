import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

  const urls = await prisma.url.findMany({
    where: {
      createdBy: {
        email: session.user.email as string,
      },
    },
  });

  return new NextResponse(JSON.stringify({ urls }), {
    status: 200,
  });
}

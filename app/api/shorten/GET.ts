import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface reqBody {
  urlCode: string;
}

export async function mGET(req: Request, res: NextApiResponse) {
  const body: reqBody = await req.json();

  const url = await prisma.url.findUnique({
    where: {
      shortId: body.urlCode,
    },
  });
  const og = url?.originalUrl;

  return new NextResponse(JSON.stringify({ og }), {
    status: 200,
  });
}

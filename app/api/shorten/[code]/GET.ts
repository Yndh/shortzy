import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ResponseInterface<T = any> extends NextApiResponse<T> {
  params: {
    code: string;
  };
}

export async function mGET(req: Request, res: ResponseInterface) {
  const code = res.params.code;

  if (!code) {
    return new NextResponse(JSON.stringify({ error: "No code found" }), {
      status: 400,
    });
  }

  const url = await prisma.url.findUnique({
    where: {
      shortId: code,
    },
  });
  const og = url?.originalUrl;

  return new NextResponse(JSON.stringify({ og }), {
    status: 200,
  });
}

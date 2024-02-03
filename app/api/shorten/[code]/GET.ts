import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { prisma } from "@/app/lib/prisma";

interface ResponseInterface<T = any> extends NextApiResponse<T> {
  params: {
    code: string;
  };
}

export async function mGET(req: Request, res: ResponseInterface) {
  const code = res.params.code;

  if (!code) {
    return new NextResponse(
      JSON.stringify({ error: "No code is provided in the URL parameters." }),
      {
        status: 400,
      }
    );
  }

  const url = await prisma.url.findUnique({
    where: {
      shortId: code,
      active: true,
    },
  });
  if (!url) {
    return new NextResponse(
      JSON.stringify({ error: "The specified short URL does not exist" }),
      {
        status: 404,
      }
    );
  }

  const og = url.originalUrl;
  return new NextResponse(JSON.stringify({ og }), {
    status: 200,
  });
}

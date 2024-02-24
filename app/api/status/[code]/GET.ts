import { NextResponse } from "next/server";
import type { NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

interface ResponseInterface<T = any> extends NextApiResponse<T> {
  params: {
    code: string;
  };
}

export async function mGET(req: Request, res: ResponseInterface) {
  const code = res.params.code;

  if (!code) {
    return new NextResponse(
      JSON.stringify({
        error: "No short URL code is provided in the URL parameters",
      }),
      {
        status: 400,
      }
    );
  }

  const url = await prisma.url.findUnique({
    where: {
      shortId: code,
    },
  });
  if (!url) {
    return new NextResponse(
      JSON.stringify({ error: "The specified short URL does not exist" }),
      {
        status: 400,
      }
    );
  }

  await prisma.url.update({
    where: {
      shortId: code,
    },
    data: {
      active: !url.active,
    },
  });

  const active = !url.active;

  return new NextResponse(JSON.stringify({ success: true, active: active }), {
    status: 200,
  });
}

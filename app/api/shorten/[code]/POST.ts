import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface reqBody {
  url: string;
}

interface ResponseInterface<T = any> extends NextApiResponse<T> {
  params: {
    code: string;
  };
}

export async function mPOST(req: Request, res: ResponseInterface) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse(
      JSON.stringify({ error: "The user is not authenticated" }),
      {
        status: 401,
      }
    );
  }

  const code = res.params.code;
  if (!code) {
    return new NextResponse(
      JSON.stringify({ error: "No code is provided in the URL parameters." }),
      {
        status: 400,
      }
    );
  }

  const body: reqBody = await req.json();
  if (!body.url) {
    return new NextResponse(
      JSON.stringify({ error: "No URL is provided in the request body" }),
      {
        status: 400,
      }
    );
  }
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!body.url.match(urlRegex)) {
    return new NextResponse(
      JSON.stringify({
        error: "The provided URL does not follow the expected format",
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

  try {
    await prisma.url.update({
      where: {
        shortId: code,
      },
      data: {
        originalUrl: body.url,
      },
    });

    return new NextResponse(
      JSON.stringify({ success: true, originalUrl: body.url }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: "An error occurred while updating the URL" }),
      {
        status: 400,
      }
    );
  }
}

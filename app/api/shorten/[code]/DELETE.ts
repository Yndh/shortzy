import { prisma } from "@/app/lib/prisma";
import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface ResponseInterface<T = any> extends NextApiResponse<T> {
  params: {
    code: string;
  };
}

export async function mDELETE(req: Request, res: ResponseInterface) {
  const session = await getServerSession();

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
      JSON.stringify({
        error: "No short URL code is provided in the URL parameters",
      }),
      {
        status: 400,
      }
    );
  }

  const url = await prisma.url.findFirst({
    where: {
      shortId: code,
      createdBy: {
        email: session.user.email as string,
      },
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

  try {
    await prisma.url.delete({
      where: {
        shortId: code,
      },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "The URL has been successfully deleted",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "An error occurred while deleting the URL" }),
      {
        status: 500,
      }
    );
  }
}

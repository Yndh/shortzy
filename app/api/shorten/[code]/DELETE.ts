import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface ResponseInterface<T = any> extends NextApiResponse<T> {
  params: {
    code: string;
  };
}

export async function mDELETE(req: Request, res: ResponseInterface) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ error: "Not Authorized" }), {
      status: 401,
    });
  }

  const code = res.params.code;
  if (!code) {
    return new NextResponse(JSON.stringify({ error: "No shortId found" }), {
      status: 400,
    });
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
      JSON.stringify({ error: "Short URL not found or not owned by the user" }),
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

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting URL:", error);

    return new NextResponse(
      JSON.stringify({ error: "Error deleting URL. Please try again later." }),
      {
        status: 500,
      }
    );
  }
}

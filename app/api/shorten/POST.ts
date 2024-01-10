import { authOptions } from "@/app/lib/authOptions";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface reqBody {
  url: string;
}

export async function mPOST(req: Request, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const body: reqBody = await req.json();
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (!body.url.match(urlRegex)) {
    return new NextResponse(JSON.stringify({ error: "Invalid URL" }), {
      status: 400,
    });
  }

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const len = 6;
  let shortId = "";
  for (let i = 0; i < len; i++) {
    shortId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  try {
    const shortUrl = await prisma.url.create({
      data: {
        originalUrl: body.url,
        shortId: shortId,
        createdBy: {
          connect: { email: session.user.email as string },
        },
      },
    });

    return new NextResponse(JSON.stringify({ shortUrl }), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to create short URL" }),
      {
        status: 400,
      }
    );
  }
}

import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface reqBody {
  url: string;
}

export async function mPOST(req: Request, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  let createdBy = null;

  if (session && session.user) {
    createdBy = { connect: { email: session.user.email as string } };
  }

  const body: reqBody = await req.json();
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

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const len = 6;
  let shortId = "";
  for (let i = 0; i < len; i++) {
    shortId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  try {
    const data: any = {
      originalUrl: body.url,
      shortId: shortId,
    };

    if (createdBy) {
      data.createdBy = createdBy;
    }

    const shortUrl = await prisma.url.create({
      data,
    });

    return new NextResponse(
      JSON.stringify({ success: true, shortUrl: shortUrl.shortId }),
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ error: "An error occurred while creating the URL" }),
      {
        status: 400,
      }
    );
  }
}

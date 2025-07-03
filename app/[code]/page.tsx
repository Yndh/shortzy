"use server";

import styles from "@/app/notFound.module.scss";
import Link from "next/link";

type Props = {
  params: {
    code: string;
  };
};

export default async function LinkRedirect({ params }: Props) {
  const { code } = params;

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/shorten/${code}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Shortened link not found");
    }

    const data = await res.json();
    const originalUrl = data.og.replace(/;307;?$/, "");

    console.log("====");
    console.log(originalUrl);

    await fetch(`${process.env.NEXTAUTH_URL}/api/clicks/${code}`, {
      method: "POST",
      cache: "no-store",
    });

    return (
      <html>
        <head>
          <meta httpEquiv="refresh" content={`0;url=${originalUrl}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.location.href = ${JSON.stringify(originalUrl)};`,
            }}
          />
        </head>
        <body>
          <p>
            Redirecting to <a href={originalUrl}>{originalUrl}</a>...
          </p>
        </body>
      </html>
    );
  } catch (err) {
    console.log(err);
    return (
      <div className={styles.main}>
        <h1>Oops!</h1>
        <p>It seems like this link is having a bit of a day off!</p>
        <Link href="/">
          <button>Let&apos;s go Home</button>
        </Link>
      </div>
    );
  }
}

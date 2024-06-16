"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/app/notFound.module.scss";
import Link from "next/link";

export default function LinkRedirect({ params }: { params: { code: string } }) {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetch(`/api/shorten/${params.code}`)
      .then((res) => res.json())
      .then((data) => {
        const og = data.og;
        setOriginalUrl(og);

        fetch(`/api/clicks/${params.code}`)
          .then((res) => res.json())
          .then((data) => {
            router.push(og);
          })
          .catch((error) => {
            setError(true);
          });
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  return (
    <>
      {error ? (
        <div className={styles.main}>
          <h1>Oops!</h1>
          <p>It seems like this link is having a bit of a day off!</p>
          <Link href="/">
            <button>Let&apos;s go Home</button>
          </Link>
        </div>
      ) : (
        originalUrl && <p>Redirecting to: {originalUrl}</p>
      )}
    </>
  );
}

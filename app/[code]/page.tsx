"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LinkRedirect({ params }: { params: { code: string } }) {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

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
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return <>{originalUrl && <p>Redirecting to: {originalUrl}</p>}</>;
}

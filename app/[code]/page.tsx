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

        router.push(og);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [params.code]);

  return <>{originalUrl && <p>Redirecting to: {originalUrl}</p>}</>;
}

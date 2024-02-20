"use client";

import { useEffect, useState } from "react";

export default function getUrl() {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    const { protocol, host } = window.location;
    setBaseUrl(`${protocol}//${host}`);
  }, []);

  return baseUrl;
}

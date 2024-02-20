"use client";

export default function getUrl() {
  if (typeof window !== "undefined") {
    const { protocol, host } = window.location;
    return `${protocol}//${host}`;
  }
  return "https://shortzyy.vercel.app/";
}

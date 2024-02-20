"use client";

export default function getUrl() {
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
}

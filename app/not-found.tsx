import styles from "@/app/notFound.module.scss";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shortzy | Page not found",
  description:
    "Shorten URLs instantly and share them with Shortzy, the user-friendly URL shortener app.",
  keywords: ["URL shortener", "link shortener", "short link", "URL management"],
};

export default function NotFound() {
  return (
    <div className={styles.main}>
      <h1>Oops! 404</h1>
      <p>
        Sorry about that! It seems the page you're looking for has taken a
        coffee break or ventured off into the digital unknown.
      </p>
      <p>No worries, though! Let's head back home and start afresh.</p>
      <Link href="/">
        <button>Take Me Home</button>
      </Link>
    </div>
  );
}

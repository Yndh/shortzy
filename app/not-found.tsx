import styles from "@/app/notFound.module.scss";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className={styles.main}>
      <h1>404</h1>
      <p>Could not find requested resource</p>
      <Link href="/">
        <button>Return Home</button>
      </Link>
    </div>
  );
}

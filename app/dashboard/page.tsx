import styles from "../dashboard.module.scss";
import LinksTable from "../components/linksTable";
import Header from "../components/header";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { authOptions } from "@/lib/authOptions";

export const metadata: Metadata = {
  title: "Shortzy | Dashboard",
  description:
    "Shorten URLs instantly and share them with Shortzy, the user-friendly URL shortener app.",
  keywords: ["URL shortener", "link shortener", "short link", "URL management"],
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className={styles.main}>
      <Header shortener={true} styles={styles} />

      <div className={styles.wrapper}>
        <LinksTable showActions={true} styles={styles} />
      </div>
    </main>
  );
}

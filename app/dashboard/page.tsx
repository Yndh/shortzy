import styles from "../dashboard.module.scss";
import LinksTable from "../components/linksTable";
import Header from "../components/header";
import SwitchToggleButton from "../components/switchToggleButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shortzy | Dashboard",
  description:
    "Shorten URLs instantly and share them with Shortzy, the user-friendly URL shortener app.",
  keywords: ["URL shortener", "link shortener", "short link", "URL management"],
};

export default async function Dashboard() {
  const session = await getServerSession();
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

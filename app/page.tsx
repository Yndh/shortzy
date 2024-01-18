import styles from "./page.module.scss";
import Shortener from "./components/shortener";
import Header from "./components/header";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header styles={styles} />

      <div className={styles.hero}>
        <h1>Shorten your Loooooong links with Shortzy!</h1>
        <p>
          Transform your lengthy URLs into concise, shareable links instantly.
        </p>

        <Shortener />

        <Image
          src="/desktopMockup.png"
          alt="desktop mockup"
          width={1120}
          height={788}
          className={styles.desktopMockup}
        />

        <Image
          src="/mobileMockup.png"
          alt="mobile mockup"
          width={246}
          height={500}
          className={styles.mobileMockup}
        />
      </div>
    </main>
  );
}

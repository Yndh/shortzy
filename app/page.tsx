import styles from "./page.module.scss";
import Shortener from "./components/shortener";
import Links from "./components/links";
import Header from "./components/header";

export default function Home() {

  return (
    <main className={styles.main}>
      <Header/>
      
      <div className={styles.wrapper}>
        <div className={styles.hero}>
          <h1>Shorten your Loooooong links with Shortzy!</h1>
          <p>
            Transform your lengthy URLs into concise, shareable links instantly.
          </p>

          <Shortener/>
          <Links/>
        </div>
      </div>
    </main>
  );
}

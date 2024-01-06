import styles from "./page.module.scss";
import Shortener from "./components/shortener";
import LinksTable from "./components/linksTable";
import Header from "./components/header";
import SwitchToggleButton from "./components/switchToggleButton";

export default function Home() {

  return (
    <main className={styles.main}>
      <Header styles={styles}/>
      
      <div className={styles.wrapper}>
        <div className={styles.hero}>
          <h1>Shorten your Loooooong links with Shortzy!</h1>
          <p>
            Transform your lengthy URLs into concise, shareable links instantly.
          </p>

          <Shortener/>

          <LinksTable styles={styles}/>
        </div>
      </div>
    </main>
  );
}

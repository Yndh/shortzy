import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.scss";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Shortener from "./components/shortener";
import Links from "./components/links";

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Shortzy</h1>
        <ol>
          <li>Login</li>
          <li>Register</li>
        </ol>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.hero}>
          <h1>Shorten for your Loooooong links with Shortzy!</h1>
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

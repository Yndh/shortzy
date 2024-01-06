import styles from "../dashboard.module.scss";
import Shortener from "../components/shortener";
import LinksTable from "../components/linksTable";
import Header from "../components/header";

export default function Dashboard() {
  return (
    <main className={styles.main}>
      <Header shortener={true}/>

      <div className={styles.wrapper}>
          <LinksTable showActions={true} styles={styles}/>
      </div>
    </main>
  );
}

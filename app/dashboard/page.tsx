import styles from "../dashboard.module.scss";
import LinksTable from "../components/linksTable";
import Header from "../components/header";
import SwitchToggleButton from "../components/switchToggleButton";

export default function Dashboard() {
  return (
    <main className={styles.main}>
      <Header shortener={true} styles={styles} />

      <div className={styles.wrapper}>

        <LinksTable showActions={true} styles={styles} />
      </div>
    </main>
  );
}

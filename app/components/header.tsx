import styles from "../page.module.scss";

export default function Header(){
    return(
        <div className={styles.header}>
        <h1>Shortzy</h1>
        <ol>
          <li><a href="">Login</a></li>
          <li><a href="">Register</a></li>
        </ol>
      </div>
    )
}
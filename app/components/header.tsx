import Link from "next/link";
import styles from "../page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function Header(){
    return(
        <div className={styles.header}>
        <h1>Shortzy</h1>
        <ol>
          <li><Link href="/login">
            Sign in
            <FontAwesomeIcon icon={faArrowRightToBracket}/>
            </Link></li>
        </ol>
      </div>
    )
}
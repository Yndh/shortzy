import Link from "next/link";
import styles from "../page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

interface HeaderInterface {
  links?: boolean;
}

export default function Header({ links = true }: HeaderInterface) {
  return (
    <div className={styles.header}>
      <Link href={"/"}><h1>Shortzy</h1></Link>
      {links && (
        <ol>
          <li>
            <Link href="/login">
              Sign in
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </Link>
          </li>
        </ol>
      )}
    </div>
  );
}

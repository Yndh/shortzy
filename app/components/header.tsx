import Link from "next/link";
import styles from "../page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Shortener from "./shortener";

interface HeaderInterface {
  links?: boolean;
  shortener? : boolean
}

export default function Header({ links = true, shortener = false }: HeaderInterface) {
  return (
    <div className={styles.header}>
      <Link href={"/"}><h1>Shortzy</h1></Link>
      {shortener && (
        <Shortener/>
      )}
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

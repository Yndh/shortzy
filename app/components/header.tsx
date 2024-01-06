import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Shortener from "./shortener";

interface HeaderInterface {
  links?: boolean;
  shortener? : boolean
  styles: {[key: string]: string}
}

export default function Header({ links = true, shortener = false, styles }: HeaderInterface) {
  return (
    <div className={styles.header}>
      <Link href={"/"}><h1>Shortzy</h1></Link>
      {shortener && (
        <Shortener stylesProps={styles}/>
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

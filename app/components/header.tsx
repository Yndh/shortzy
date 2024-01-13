"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Shortener from "./shortener";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface HeaderInterface {
  links?: boolean;
  shortener?: boolean;
  styles: { [key: string]: string };
}

export default function Header({
  links = true,
  shortener = false,
  styles,
}: HeaderInterface) {
  const { data: session } = useSession();
  console.log("================================");

  console.log(session?.user);

  const logoutHandler = () => {
    signOut();
    redirect("/");
  };

  return (
    <div className={styles.header}>
      <Link href={"/"}>
        <h1>Shortzy</h1>
      </Link>
      {shortener && <Shortener stylesProps={styles} />}
      {links && (
        <ol>
          {session?.user ? (
            <>
              <li>
                <Link href={"/dashboard"} className={styles.profileLink}>
                  <Image
                    src={`${session.user.image}`}
                    width={30}
                    height={30}
                    alt="pfp"
                  />
                  <p className={styles.userName}>{session.user.name}</p>
                </Link>
              </li>

              <li>
                <button className={styles.logout} onClick={logoutHandler}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                Sign in
                <FontAwesomeIcon icon={faArrowRightToBracket} />
              </Link>
            </li>
          )}
        </ol>
      )}
    </div>
  );
}

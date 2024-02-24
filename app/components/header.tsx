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
import { useEffect, useState } from "react";

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
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 35);
  };

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.exists == false) {
          signOut();
          redirect("/login");
        }
      });
  }, [false]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { data: session } = useSession();
  console.log(session);

  const logoutHandler = () => {
    signOut();
    redirect("/");
  };

  return (
    <div
      className={
        isScrolled ? `${styles.header} ${styles.scrolled}` : styles.header
      }
    >
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
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      width={30}
                      height={30}
                      alt="User Profile Picture"
                    />
                  ) : (
                    <Image
                      src={"/pfp.svg"}
                      width={30}
                      height={30}
                      alt="Default Profile Picture"
                    />
                  )}
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

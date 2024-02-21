"use client";

import styles from "../login.module.scss";
import Header from "../components/header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Register() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  if (status === "authenticated") {
    redirect("/dashboard");
  }

  useEffect(() => {
    const search = searchParams.get("error");
    if (search) {
      setError(search);
    }
  }, [searchParams]);

  const googleButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    toast("Login Google");
    try {
      signIn("google");
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const githubButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    toast("Login Github");
    try {
      signIn("github");
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  return (
    <div className={styles.main}>
      <Header links={false} styles={styles} />

      <div className={styles.formContainer}>
        <h2>Let&apos;s get Started</h2>
        <span className={styles.description}>
          Sign up and shorten Your links
        </span>

        <button
          type="button"
          onClick={googleButtonHandler}
          className={styles.google}
        >
          <FontAwesomeIcon icon={faGoogle} />
          <span>Sign in with Google</span>
        </button>

        <span className={styles.or}>or</span>

        <button type="button" onClick={githubButtonHandler}>
          <FontAwesomeIcon icon={faGithub} />
          <span>Sign in with GitHub</span>
        </button>

        {error && <p>{error}</p>}

        {/* <span className={styles.pageLink}>
        <span>Already a member? </span>
        <Link href={"/login"} className={styles.link}>
          Sign in!
        </Link>
      </span> */}
      </div>
    </div>
  );
}

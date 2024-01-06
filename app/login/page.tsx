"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../login.module.scss";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [error, setError] = useState<string>();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    throw new Error("Function not implemented.");
  };

  const googleButtonHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    throw new Error("Function not implemented.");
  };

  const githubButtonHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    throw new Error("Function not implemented.");
  };

  return (
    <div className={styles.main}>
      <form onSubmit={submitHandler} className={styles.formContainer}>
        <h2>Let's get Started</h2>
        <span className={styles.description}>Sign up and shorten Your links</span>

        <button type="button" onClick={googleButtonHandler}>
          <FontAwesomeIcon icon={faGoogle} />
          <span>Sign in with Google</span>
        </button>

        <span className={styles.or}>or</span>

        <button type="button" onClick={githubButtonHandler}>
          <FontAwesomeIcon icon={faGithub} />
          <span>Sign in with GitHub</span>
        </button>
        
      {/* <span className={styles.pageLink}>
        <span>Already a member? </span>
        <Link href={"/login"} className={styles.link}>
          Sign in!
        </Link>
      </span> */}
      </form>
    </div>
  );
}

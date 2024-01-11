"use client";

import styles from "../page.module.scss";
import { faAngleRight, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SwitchToggleButton from "./switchToggleButton";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ShortenerProps {
  stylesProps?: { [key: string]: string };
}

export default function Shortener({ stylesProps = styles }: ShortenerProps) {
  const [url, setUrl] = useState<string>("");
  const [autoPaste, setAutoPaste] = useState<boolean>(() => {
    const localStorageValue = localStorage.getItem("autoPaste");
    return localStorageValue ? JSON.parse(localStorageValue) : false;
  });
  useEffect(() => {
    localStorage.setItem("autoPaste", JSON.stringify(autoPaste));

    if (autoPaste) {
      navigator.clipboard
        .readText()
        .then((urlData) => {
          if (validateUrl(urlData)) {
            setUrl(urlData);
          }
        })
        .catch((err) => {
          console.error("Failed to paste from clipboard:", err);
        });
    }
  }, [autoPaste]);

  const validateUrl = (url: string) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return url.match(urlRegex);
  };

  const handleShortenButton = async () => {
    if (!validateUrl(url)) {
      toast.error("Please enter a valid URL");
      return;
    }

    const options = {
      method: "POST",
      body: JSON.stringify({ url: url }),
    };
    await fetch("/api/shorten", options)
      .then((res) => res.json())
      .then((data) => {
        if ("error" in data) {
          toast.error(`Failed to create short URL`);
          console.error(`Failed to create short URL: ${data.error}`);
          return;
        }
        toast.success(`Short link created!`);
        console.log(`Created URL: ${data}`);
      });
  };

  return (
    <div className={stylesProps.shortenerContainer}>
      <div className={stylesProps.borderContainer}>
        <FontAwesomeIcon icon={faLink} />
        <input
          type="text"
          placeholder="Enter the link here"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <button onClick={handleShortenButton}>
          <span className={stylesProps.buttonText}>Shorten Now</span>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      <div className="row">
        <SwitchToggleButton isChecked={autoPaste} setIsChecked={setAutoPaste} />
        <span style={{ fontSize: 14 }}>Auto Paste from Clipboard </span>
      </div>
    </div>
  );
}

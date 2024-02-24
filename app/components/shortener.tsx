"use client";

import styles from "../page.module.scss";
import {
  faAngleRight,
  faCopy,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SwitchToggleButton from "./switchToggleButton";
import { PrismaClient } from "@prisma/client";
import Modal from "./Modal";
import getUrl from "../../lib/getUrl";

const prisma = new PrismaClient();

interface ShortenerProps {
  stylesProps?: { [key: string]: string };
}

export default function Shortener({ stylesProps = styles }: ShortenerProps) {
  const [url, setUrl] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState<string>("");
  const [autoPaste, setAutoPaste] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const localStorageValue = localStorage.getItem("autoPaste");
      return localStorageValue ? JSON.parse(localStorageValue) : false;
    }
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("autoPaste", JSON.stringify(autoPaste));

      if (autoPaste) {
        try {
          navigator.clipboard
            .readText()
            .then((urlData) => {
              if (validateUrl(urlData)) {
                setUrl(urlData);
              }
            })
            .catch((err) => {
              console.error("Failed to paste from clipboard:", err);
              toast.error("Failed to read url from clipboard");
            });
        } catch (e) {
          console.error("Failed to access clipboard:", e);
          toast.error("Failed to access clipboard");
        }
      }
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
          return;
        }
        toast.success(`Short link created!`);

        setShortUrl(data.shortUrl);
        toggleModal();
      });
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link).then(
      () => {
        toast.success("Copied link!");
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const closeHandler = () => {
    window.location.reload();
    setModalIsOpen(false);
  };

  return (
    <>
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
          <SwitchToggleButton
            isChecked={autoPaste}
            setIsChecked={setAutoPaste}
          />
          <span style={{ fontSize: 14 }}>Auto Paste from Clipboard </span>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onClose={closeHandler}>
        <h1>Short Url Created</h1>
        <p>Your short URL has been successfully created</p>
        <div className="modalRow" style={{ marginTop: 15 }}>
          <div className="copyInput">
            <input value={`${getUrl()}/${shortUrl}`} disabled={true} />
            <button onClick={() => copyLink(`${getUrl()}/${shortUrl}`)}>
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
        <div className="modalRow" style={{ marginTop: 15 }}>
          <button onClick={closeHandler}>Zamknij</button>
        </div>
      </Modal>
    </>
  );
}

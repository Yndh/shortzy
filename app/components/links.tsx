"use client";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import styles from "../page.module.scss";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

interface LinkData {
  linkCode: string;
  originalLink: string;
  clicks: number;
  active: boolean;
  date: Date;
}

export default function LinkTable() {
  const [data, setData] = useState<LinkData[]>([
    {
      linkCode: "",
      originalLink: "https://www.twitter.com/",
      clicks: 1313,
      active: true,
      date: new Date()
    },
    {
      linkCode: "",
      originalLink: "https://www.youtube.com/",
      clicks: 3623,
      active: true,
      date: new Date()
    },
    {
      linkCode: "",
      originalLink: "https://www.figma.com/",
      clicks: 532,
      active: true,
      date: new Date()
    },
    {
      linkCode: "",
      originalLink: "https://www.github.com/",
      clicks: 354,
      active: true,
      date: new Date()
    },
    {
      linkCode: "",
      originalLink: "https://www.yeezy.com/",
      clicks: 354,
      active: true,
      date: new Date()
    },
    {
      linkCode: "",
      originalLink: "https://trackerhub.vercel.app/s/1vW-nFbnR02F9BEnNPe5NBejHRGPt0QEGOYXLSePsC1k/best",
      clicks: 5634,
      active: false,
      date: new Date()
    },
    {
      linkCode: "",
      originalLink: "https://nextjs.org/",
      clicks: 5634,
      active: true,
      date: new Date()
    },
  ]);

  useEffect(() => {
    const updatedData = data.map((row) => ({
      ...row,
      linkCode: generateLinkCode(),
    }));
    setData(updatedData);
  }, []);

  const generateLinkCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 10;
    let linkCode = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      linkCode += characters.charAt(randomIndex);
    }
    return linkCode;
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link).then(
      () => {
        console.log(`Copied link`);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.linksTable}>
        <thead>
          <tr>
            <th>Short Link</th>
            <th>Original Link</th>
            <th>QR Code</th>
            <th>Clicks</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                <td>
                  <span className={styles.rowText}>
                    <a
                      href={`http://localhost:3000/${row.linkCode}`}
                      target="_blank"
                    >
                      <span className={styles.linkText}>
                        http://localhost:3000/{row.linkCode}
                      </span>
                    </a>
                    <button
                      onClick={(e) => {
                        copyLink(`http://localhost:3000/${row.linkCode}`);
                      }}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                  </span>
                </td>
                <td>
                  <a href={row.originalLink} target="_blank">
                    <Image
                      src={`https://www.google.com/s2/favicons?sz=64&domain_url=${row.originalLink}`}
                      width={20}
                      height={20}
                      alt="Favicon"
                      className={styles.linkIcon}
                    />
                    <span className={styles.linkText}>{row.originalLink}</span>
                  </a>
                </td>
                <td>
                  <QRCode
                    value={`http://localhost:3000/${row.linkCode}`}
                    style={{ width: "50px", height: "50px" }}
                    bgColor="transparent"
                    fgColor="#C9CED6"
                  />
                </td>
                <td>{row.clicks}</td>
                <td className={row.active ? styles.active : styles.inactive}>{row.active ? "Active" : "Inactive"}</td>
                <td>{formatDate(row.date)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className={styles.emptyData}>
                <div className={styles.emptyContainer}>
                  <p>Looks like there are no links at the moment.</p>
                  <p>Why not create one and track its performance?</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

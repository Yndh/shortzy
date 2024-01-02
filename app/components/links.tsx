"use client";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import styles from "../page.module.scss";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LinkTable() {
  const [data, setData] = useState([
    {
      linkCode: "",
      originalLink: "https://www.twitter.com/",
      clicks: 1313,
      status: "Active",
      date: new Date(),
      favicon: "",
    },
    {
      linkCode: "",
      originalLink: "https://www.youtube.com/",
      clicks: 3623,
      status: "Active",
      date: new Date(),
      favicon: "",
    },
    {
      linkCode: "",
      originalLink: "https://www.figma.com/",
      clicks: 532,
      status: "Active",
      date: new Date(),
      favicon: "",
    },
    {
      linkCode: "",
      originalLink: "https://www.github.com/",
      clicks: 354,
      status: "Active",
      date: new Date(),
      favicon: "",
    },
    {
      linkCode: "",
      originalLink: "https://www.yeezy.com/",
      clicks: 354,
      status: "Active",
      date: new Date(),
      favicon: "",
    },
    {
      linkCode: "",
      originalLink: "https://trackerhub.vercel.app/s/1vW-nFbnR02F9BEnNPe5NBejHRGPt0QEGOYXLSePsC1k/best",
      clicks: 5634,
      status: "Active",
      date: new Date(),
      favicon: "",
    },
    {
      linkCode: "",
      originalLink: "https://nextjs.org/",
      clicks: 5634,
      status: "Active",
      date: new Date(),
      favicon: "",
    },
    
  ]);

  useEffect(() => {
    const fetchFavicon = async () => {
        const updatedData = await Promise.all(
          data.map(async (row) => {
            try {
              const faviconURL = `https://www.google.com/s2/favicons?sz=64&domain_url=${new URL(row.originalLink).hostname}`;
              return { ...row, favicon: faviconURL, linkCode: generateLinkCode() };
            } catch (error) {
              console.error("Error fetching favicon: ", error);
              return row;
            }
          })
        );
        setData(updatedData);
      };
      
      fetchFavicon();
  }, []);

  const generateLinkCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10;
    let linkCode = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      linkCode += characters.charAt(randomIndex);
    }
    return linkCode;
  }

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
        }, (err) => {
            console.error(err);
        }
    );
  }

  return (
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
        {data.map((row, index) => (
          <tr key={index}>
            <td>
              <span className={styles.rowText}>
                <a href={`http://localhost:3000/${row.linkCode}`} target="_blank">
                    <span className={styles.linkText}>http://localhost:3000/{row.linkCode}</span>
                </a>
                <button onClick={(e) => {copyLink(`http://localhost:3000/${row.linkCode}`)}}>
                    <FontAwesomeIcon icon={faCopy}/>
                </button>
              </span>
            </td>
            <td>
              <a href={row.originalLink} target="_blank">
                {row.favicon && (
                  <img
                    src={row.favicon}
                    alt="Favicon"
                    className={styles.linkIcon}
                  />
                )}
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
            <td>{row.status}</td>
            <td>{formatDate(row.date)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

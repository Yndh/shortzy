"use client";
import styles from "../page.module.scss";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";

export default function LinkTable() {
  const [data, setData] = useState([
    {
      linkCode: "Bn41aCOlnxj",
      originalLink: "https://www.twitter.com/",
      clicks: 1313,
      status: "Active",
      date: new Date(),
      favicon: "",
    },
    {
      linkCode: "Bn41aCOlnxj",
      originalLink: "https://www.youtube.com/",
      clicks: 1313,
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
              return { ...row, favicon: faviconURL };
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

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

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
              <a href={`http://localhost:3000/${row.linkCode}`} target="_blank">
                http://localhost:3000/{row.linkCode}
              </a>
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
                {row.originalLink}
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

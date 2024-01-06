"use client";
import {
  faCaretDown,
  faCaretUp,
  faChevronDown,
  faChevronUp,
  faCopy,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { toast } from "react-toastify";

interface LinkTableProps {
  showActions?: boolean;
  styles: { [key: string]: string };
}

interface LinkData {
  linkCode: string;
  originalLink: string;
  clicks: number;
  active: boolean;
  date: Date;
  isOpen?: boolean;
}

export default function LinkTable({ showActions = false, styles }: LinkTableProps) {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [data, setData] = useState<LinkData[]>([
      {
        linkCode: "",
        originalLink: "https://www.twitter.com/",
        clicks: 1313,
        active: true,
        date: new Date('2024-01-04T08:00:00'),
      },
      {
        linkCode: "",
        originalLink: "https://www.youtube.com/",
        clicks: 3623,
        active: true,
        date: new Date('2024-01-05T14:30:00'),
      },
      {
        linkCode: "",
        originalLink: "https://www.figma.com/",
        clicks: 532,
        active: true,
        date: new Date('2024-01-06T10:45:00'),
      },
      {
        linkCode: "",
        originalLink: "https://www.github.com/",
        clicks: 354,
        active: true,
        date: new Date('2024-01-04T19:20:00'),
      },
      {
        linkCode: "",
        originalLink: "https://www.yeezy.com/",
        clicks: 354,
        active: true,
        date: new Date('2024-01-05T09:05:00'),
      },
      {
        linkCode: "",
        originalLink: "https://trackerhub.vercel.app/s/1vW-nFbnR02F9BEnNPe5NBejHRGPt0QEGOYXLSePsC1k/best",
        clicks: 5634,
        active: false,
        date: new Date('2024-01-06T16:15:00'),
      },
      {
        linkCode: "",
        originalLink: "https://nextjs.org/",
        clicks: 5634,
        active: true,
        date: new Date('2024-01-04T12:10:00'),
      },
      {
        linkCode: "",
        originalLink: "https://facebook.com/",
        clicks: 5634,
        active: true,
        date: new Date('2024-01-05T20:55:00'),
      },
      {
        linkCode: "",
        originalLink: "https://discord.gg/",
        clicks: 5634,
        active: true,
        date: new Date('2024-01-06T06:40:00'),
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
        toast.success("Copied link!")
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const toggleMobileList = (index: number) => {
      const updatedData = getSortedData().map((item, id) => {
        if (id === index) {
          return { ...item, isOpen: !item.isOpen };
        }
        return item;
      });
      setData(updatedData);
  }

  const sortByDate = () => {
    sortDirection === "asc" ? setSortDirection("desc") : setSortDirection("asc");
  }

  const getSortedData = () => {
    const sortedData = [...data].sort((a, b) => a.date.getTime() - b.date.getTime());
    return sortDirection === "asc" ? sortedData : sortedData.reverse();
  }

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
            <th>
              <div className={styles.thContainer} onClick={sortByDate}>
                Date
                <div className={`${styles.sortContainer} ${(sortDirection === "asc" ? styles.asc : styles.desc)}`}>
                  <FontAwesomeIcon icon={faCaretUp}/>
                  <FontAwesomeIcon icon={faCaretDown}/>
                </div> 
              </div> 
            </th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            getSortedData().map((row, index) => {
              return (
                <tr key={index} className={row.isOpen ? styles.active : ""}>
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
                        className={styles.tableButton}
                        onClick={(e) => {
                          copyLink(`http://localhost:3000/${row.linkCode}`);
                        }}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                      <button
                        className={styles.mobileButton}
                        onClick={() => toggleMobileList(index)}
                      >
                        <FontAwesomeIcon
                          icon={row.isOpen ? faChevronUp : faChevronDown}
                        />
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
                      <span className={styles.linkText}>
                        {row.originalLink}
                      </span>
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
                  <td className={row.active ? styles.active : styles.inactive}>
                    {row.active ? "Active" : "Inactive"}
                  </td>
                  <td>{formatDate(row.date)}</td>
                  {showActions && (
                    <td>
                      <div className={styles.actionContainer}>
                        <button className={styles.tableButton}>
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        
                        <button className={styles.tableButton}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
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

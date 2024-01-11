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
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface LinkTableProps {
  showActions?: boolean;
  styles: { [key: string]: string };
}

interface LinkData {
  shortId: string;
  originalUrl: string;
  clicks: number;
  active: boolean;
  createdAt: Date;
  isOpen?: boolean;
}

export default function LinkTable({
  showActions = false,
  styles,
}: LinkTableProps) {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [data, setData] = useState<LinkData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch("/api/urls")
          .then((res) => res.json())
          .then((data: any) => {
            if ("error" in data) {
              toast.error("Failed to fetch links");
              console.error(`Failed to fetch links ${data.error}`);
              return;
            }

            const urls = data.urls;

            const urlsData = urls.map((url: LinkData) => ({
              shortId: url.shortId,
              originalUrl: url.originalUrl,
              clicks: url.clicks,
              active: url.active,
              createdAt: new Date(url.createdAt),
            }));

            setData(urlsData);
          });
      } catch (e) {
        console.error(`Cant fetch data: ${e}`);
      }
    };

    fetchData();
  }, []);

  const formatDate = (createdAt: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(createdAt);
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

  const toggleMobileList = (index: number) => {
    const upcreatedAtdData = getSortedData().map((item, id) => {
      if (id === index) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });
    setData(upcreatedAtdData);
  };

  const sortBycreatedAt = () => {
    sortDirection === "asc"
      ? setSortDirection("desc")
      : setSortDirection("asc");
  };

  const getSortedData = () => {
    const sortedData = [...data].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
    return sortDirection === "asc" ? sortedData : sortedData.reverse();
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
            <th>
              <div className={styles.thContainer} onClick={sortBycreatedAt}>
                createdAt
                <div
                  className={`${styles.sortContainer} ${
                    sortDirection === "asc" ? styles.asc : styles.desc
                  }`}
                >
                  <FontAwesomeIcon icon={faCaretUp} />
                  <FontAwesomeIcon icon={faCaretDown} />
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
                        href={`http://localhost:3000/${row.shortId}`}
                        target="_blank"
                      >
                        <span className={styles.linkText}>
                          http://localhost:3000/{row.shortId}
                        </span>
                      </a>
                      <button
                        className={styles.tableButton}
                        onClick={(e) => {
                          copyLink(`http://localhost:3000/${row.shortId}`);
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
                    <a href={row.originalUrl} target="_blank">
                      <Image
                        src={`https://www.google.com/s2/favicons?sz=64&domain_url=${row.originalUrl}`}
                        width={20}
                        height={20}
                        alt="Favicon"
                        className={styles.linkIcon}
                      />
                      <span className={styles.linkText}>{row.originalUrl}</span>
                    </a>
                  </td>
                  <td>
                    <QRCode
                      value={`http://localhost:3000/${row.shortId}`}
                      style={{ width: "50px", height: "50px" }}
                      bgColor="transparent"
                      fgColor="#C9CED6"
                    />
                  </td>
                  <td>{row.clicks}</td>
                  <td className={row.active ? styles.active : styles.inactive}>
                    {row.active ? "Active" : "Inactive"}
                  </td>
                  <td>{formatDate(row.createdAt)}</td>
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
              <td colSpan={7} className={styles.emptyData}>
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

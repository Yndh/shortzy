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
import Modal from "./Modal";
import Input from "./input";
import Link from "next/link";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editShortId, setEditShortId] = useState<string>();
  const [editUrl, setEditUrl] = useState<string>();
  const [deleteShortId, setDeleteShortId] = useState<string>();

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

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const prepareForDelete = (shortId: string) => {
    toggleModal();
    setDeleteShortId(shortId);
  };

  const deleteUrl = (shortId: string) => {
    const options = {
      method: "DELETE",
    };

    fetch(`/api/shorten/${shortId}`, options)
      .then((res) => res.json())
      .then((apiData) => {
        if ("success" in apiData) {
          const updatedData = data.filter(
            (link: LinkData) => link.shortId !== shortId
          );
          setData(updatedData);
          toast.success("Url deleted successfully!");
        } else if ("error" in apiData) {
          toast.error("Failed to delete link else");
        }
      })
      .catch((err) => {
        toast.error("Failed to delete link catch ->", err);
      })
      .finally(() => {
        toggleModal();
      });
  };

  const toggleEditModal = () => {
    setEditModalIsOpen(!editModalIsOpen);
  };

  const prepareForEdit = (shortId: string, originalUrl: string) => {
    setEditShortId(shortId);
    setEditUrl(originalUrl);
    toggleEditModal();
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUrl(e.target.value);
  };

  const editUrlHandler = (shortId: string, url: string) => {
    const options = {
      method: "POST",
      body: JSON.stringify({ url: url }),
    };
    fetch(`/api/shorten/${shortId}`, options)
      .then((res) => res.json())
      .then((urlData) => {
        if ("success" in urlData) {
          const updatedData = data.map((link: LinkData) =>
            link.shortId === shortId
              ? { ...link, originalUrl: urlData.originalUrl }
              : link
          );
          setData(updatedData);

          toast.success("The URL has been successfully updated");
          toggleEditModal();
        }
      })
      .catch((err) => {
        toast.error("An error occurred while updating the URL");
      });
  };

  return (
    <>
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
                  Date
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
                        <span className={styles.linkText}>
                          {row.originalUrl}
                        </span>
                      </a>
                    </td>
                    <td>
                      <Link href={`/qr/${row.shortId}`} target="_blank">
                        <QRCode
                          value={`http://localhost:3000/${row.shortId}`}
                          style={{ width: "50px", height: "50px" }}
                          bgColor="transparent"
                          fgColor="#C9CED6"
                        />
                      </Link>
                    </td>
                    <td>{row.clicks}</td>
                    <td
                      className={row.active ? styles.active : styles.inactive}
                    >
                      {row.active ? "Active" : "Inactive"}
                    </td>
                    <td>{formatDate(row.createdAt)}</td>
                    {showActions && (
                      <td>
                        <div className={styles.actionContainer}>
                          <button
                            className={styles.tableButton}
                            onClick={() => {
                              prepareForEdit(row.shortId, row.originalUrl);
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>

                          <button className={styles.tableButton}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => {
                                prepareForDelete(row.shortId);
                              }}
                            />
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
      <Modal isOpen={modalIsOpen} onClose={toggleModal}>
        <h1>Are you sure?</h1>
        <p>You will not be able to recover this link!</p>
        <div className="modalRow">
          <button onClick={toggleModal}>Cancel</button>
          <button
            onClick={() => {
              deleteUrl(deleteShortId as string);
            }}
          >
            Delete
          </button>
        </div>
      </Modal>

      <Modal isOpen={editModalIsOpen} onClose={toggleEditModal} size={2}>
        <h1>Edit link</h1>
        <p>Change destination url</p>

        <Input
          name="Short Url"
          value={`localhost:3000/${editShortId}`}
          disabled={true}
          onChange={() => {
            return;
          }}
        />
        <Input
          name="Destination Url"
          value={editUrl as string}
          onChange={handleUrlChange}
        />

        <div className="modalRow">
          <button onClick={toggleEditModal}>Cancel</button>
          <button
            onClick={() => {
              editUrlHandler(editShortId as string, editUrl as string);
            }}
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
}

"use client";
import {
  faCaretDown,
  faCaretUp,
  faChevronDown,
  faChevronUp,
  faCopy,
  faEye,
  faEyeSlash,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { toast } from "react-toastify";
import Modal from "./Modal";
import Input from "./input";
import getUrl from "./url";

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

export default async function LinkTable({
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
  const [actionType, setActionType] = useState<
    "delete" | "edit" | "toggleStatus"
  >("delete");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch("/api/urls")
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
        console.error(`Can't fetch data: ${e}`);
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
    const updatedData = getSortedData().map((item, id) => {
      if (id === index) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });
    setData(updatedData);
  };

  const sortByCreatedAt = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const getSortedData = () => {
    const sortedData = [...data].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
    return sortDirection === "asc" ? sortedData : sortedData.reverse();
  };

  const toggleModal = (action: "delete" | "edit" | "toggleStatus") => {
    setModalIsOpen(!modalIsOpen);
    setActionType(action);
  };

  const prepareForDelete = (shortId: string) => {
    toggleModal("delete");
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
          toast.error("Failed to delete link");
        }
      })
      .catch((err) => {
        toast.error("Failed to delete link", err);
      })
      .finally(() => {
        toggleModal("delete");
      });
  };

  const prepareForEdit = (shortId: string, originalUrl: string) => {
    setEditShortId(shortId);
    setEditUrl(originalUrl);
    toggleModal("edit");
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
          toggleModal("edit");
        }
      })
      .catch((err) => {
        toast.error("An error occurred while updating the URL");
      });
  };

  const toggleLinkStatus = (shortId: string) => {
    fetch(`/api/status/${shortId}`)
      .then((res) => res.json())
      .then((urlData) => {
        if ("success" in urlData) {
          const updatedData = data.map((link) =>
            link.shortId === shortId
              ? { ...link, active: urlData.active }
              : link
          );
          setData(updatedData);

          toast.success("Url status was updated successfully");
          toggleModal("toggleStatus");
        }
      })
      .catch((err) => {
        toast.error("An error occurred while updating the URL status");
      });
  };

  const saveQrCode = (shortId: string) => {
    const canvas = document.getElementById(
      `qr-${shortId}`
    ) as HTMLCanvasElement;

    if (canvas) {
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `qrcode_${shortId}.png`;
      link.click();
    }
  };

  const getModalContent = () => {
    switch (actionType) {
      case "delete":
        return (
          <>
            <h1>Delete link</h1>
            <p>You will not be able to recover this link!</p>
            <div className="modalRow">
              <button onClick={() => toggleModal(actionType)}>Cancel</button>
              <button
                onClick={() => {
                  deleteUrl(deleteShortId as string);
                  toggleModal(actionType);
                }}
              >
                Delete
              </button>
            </div>
          </>
        );
      case "edit":
        return (
          <>
            <h1>Edit link</h1>
            <p>Change destination URL</p>
            <Input
              name="Short Url"
              value={`${getUrl()}/${editShortId}`}
              disabled={true}
              onChange={() => {}}
            />
            <Input
              name="Destination Url"
              value={editUrl as string}
              onChange={handleUrlChange}
              focus={true}
            />
            <div className="modalRow">
              <button onClick={() => toggleModal(actionType)}>Cancel</button>
              <button
                onClick={() => {
                  editUrlHandler(editShortId as string, editUrl as string);
                  toggleModal(actionType);
                }}
              >
                Save
              </button>
            </div>
          </>
        );
      case "toggleStatus":
        const isActive = data.find(
          (link) => link.shortId === editShortId
        )?.active;
        return (
          <>
            <h1>{isActive ? "Disable Link" : "Enable Link"}</h1>
            <p>
              {isActive
                ? "Do you want to disable this link?"
                : "Do you want to enable this link?"}
            </p>
            <div className="modalRow">
              <button onClick={() => toggleModal(actionType)}>Cancel</button>
              <button
                onClick={() => {
                  toggleLinkStatus(editShortId as string);
                  toggleModal(actionType);
                }}
              >
                {isActive ? "Disable" : "Enable"}
              </button>
            </div>
          </>
        );
      default:
        return <></>;
    }
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
                <div className={styles.thContainer} onClick={sortByCreatedAt}>
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
              getSortedData().map((row, index) => (
                <tr key={index} className={row.isOpen ? styles.active : ""}>
                  <td>
                    <span className={styles.rowText}>
                      <a href={`${getUrl()}/${row.shortId}`} target="_blank">
                        <span className={styles.linkText}>
                          {getUrl()}/{row.shortId}
                        </span>
                      </a>
                      <button
                        className={styles.tableButton}
                        onClick={(e) => {
                          copyLink(`${getUrl()}/${row.shortId}`);
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
                      id={`qr-${row.shortId}`}
                      value={`${getUrl()}/${row.shortId}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                      bgColor="transparent"
                      fgColor="#C9CED6"
                      onClick={() => saveQrCode(row.shortId)}
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
                        <button
                          className={styles.tableButton}
                          onClick={() => {
                            toggleModal("toggleStatus");
                            setEditShortId(row.shortId);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={row.active ? faEye : faEyeSlash}
                          />
                        </button>

                        <button
                          className={styles.tableButton}
                          onClick={() => {
                            prepareForEdit(row.shortId, row.originalUrl);
                          }}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>

                        <button
                          className={styles.tableButton}
                          onClick={() => {
                            prepareForDelete(row.shortId);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
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

      <Modal isOpen={modalIsOpen} onClose={() => toggleModal(actionType)}>
        {getModalContent()}
      </Modal>
    </>
  );
}

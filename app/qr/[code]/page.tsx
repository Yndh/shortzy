"use client";

import { useState, useRef } from "react";
import styles from "@/app/qr.module.scss";
import QRCode from "qrcode.react";

export default function qrCode({ params }: { params: { code: string } }) {
  const qrCodeRef = useRef(null);

  const saveQrCode = () => {
    const canvas = document.querySelector("canvas");
    const image = canvas?.toDataURL("image/png");

    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <main className={styles.main}>
      <div ref={qrCodeRef}>
        <QRCode
          value={`http://localhost:3000/${params.code}`}
          style={{
            marginBottom: "50px",
          }}
          size={300}
          bgColor="#04080F"
          fgColor="#C9CED6"
        />
      </div>
      <button onClick={saveQrCode}>Save QRCode</button>
    </main>
  );
}

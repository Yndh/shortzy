"use client"

import styles from "../page.module.scss";
import { faAngleRight, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Shortener(){
    const [url, setUrl] = useState<string>("");

    const shortenButtonAction = () => {
        alert(url)
    }

    return(
        <div className={styles.borderContainer}>
            <FontAwesomeIcon icon={faLink} />
            <input type="text" placeholder="Enter the link here" value={url} onChange={(e) => {setUrl(e.target.value)}}/>
            <button onClick={shortenButtonAction}>
                <span className={styles.buttonText}>Shorten Now</span>
                <FontAwesomeIcon icon={faAngleRight}/>    
            </button>
          </div>
    )
}
"use client"

import styles from "../page.module.scss";
import { faAngleRight, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface ShortenerProps{
    stylesProps?: { [key: string]: string }
}

export default function Shortener({ stylesProps = styles }: ShortenerProps){
    const [url, setUrl] = useState<string>("");

    const shortenButtonAction = () => {
        alert(url)
    }

    return(
        <div className={stylesProps.borderContainer}>
            <FontAwesomeIcon icon={faLink} />
            <input type="text" placeholder="Enter the link here" value={url} onChange={(e) => {setUrl(e.target.value)}}/>
            <button onClick={shortenButtonAction}>
                <span className={stylesProps.buttonText}>Shorten Now</span>
                <FontAwesomeIcon icon={faAngleRight}/>    
            </button>
          </div>
    )
}
"use client"
import "../globals.scss"
import { useState } from "react"

interface SwitchToggleButtonProps{
    isChecked: boolean,
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SwitchToggleButton({ isChecked, setIsChecked }: SwitchToggleButtonProps) {
    // const [isChecked, setIsChecked] = useState(false)

    const toggleSwitch = () => {
        setIsChecked(!isChecked)
    }

    return(
        <div className="switchContainer">
            <input type="checkbox" checked={isChecked} onChange={toggleSwitch} id="toggleSwitch"/>
            <label htmlFor="toggleSwitch" className="switchLabel">
                <span className="sliderCircle"></span>
            </label>
        </div>
    )
}
import {ReactProps} from "../../interfaces/ReactProps";
import React, {useEffect} from "react";

interface SimpleButton extends ReactProps {
    text: string,
    type: "primary" | "secondary" | "success" | "info" | "danger" | "warning" | "colorless",
    className?: string,
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

let colors = {
    primary: "#2563eb",
    secondary: "#a8a29e",
    success: "#22c55e",
    info: "#0891b2",
    danger: "#f43f5e",
    warning: "#eab308",
    colorless: ""
}

export const SimpleButton = ({children, text, type, className, disabled, onClick, ...props}: SimpleButton) => {
    return (
        <button
            type={"submit"}
            disabled={disabled}
            style={{backgroundColor: colors[type]}}
            className={`${!className?.includes("h-") ? "h-12" : ""} ${!className?.includes("w-") ? "w-full" : ""} flex items-center justify-center text-white font-bold designera-rounded designera-box-shadow ${className}`}
            onClick={(e) => {
                return onClick && onClick(e)
            }}
        >
            {text}
        </button>
    )
}

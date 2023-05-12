import {ReactProps} from "../../interfaces/ReactProps";
import React, {ReactElement, useEffect} from "react";

interface IconButton extends ReactProps {
    icon?: ReactElement;
    className?: string,
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

export const IconButton = ({children, icon, className, onClick, ...props}: IconButton) => {
    return (
        <button
            className={`icon-button flex justify-center items-center designera-rounded z-40 overflow-hidden ${className?.includes("p-") ? "" : "p-2"} ${className || ""}`}
            style={{
                height: "40px",
                width: "40px",
                backgroundColor: !className?.includes("bg-") ? "rgba(36, 36, 36, 0.75)" : undefined
            }}
            onClick={(e) => {
                return onClick && onClick(e)
            }}
        >
            {icon || "-"}
        </button>
    )
}

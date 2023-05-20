import {ReactProps} from "../../interfaces/ReactProps";
import React, {ReactElement, useEffect, useState} from "react";
import {Tooltip as ReactTooltip} from "react-tooltip";
import { uuid } from 'uuidv4';

interface IconButton extends ReactProps {
    icon?: ReactElement;
    className?: string,
    description?: string,
    onClick?: (e: React.MouseEvent<HTMLElement>) => void,
}

export const IconButton = ({children, icon, className, description, onClick, ...props}: IconButton) => {
    const [random, setRandom] = useState(uuid())

    return (
      <>
        <button
            id={String(random)}
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
        <ReactTooltip
          anchorId={String(random)}
          place="left"
          content={description || "Placeholder"}
          delayShow={500}
        />
      </>
    )
}

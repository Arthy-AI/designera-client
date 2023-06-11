import {ReactProps} from "../../../interfaces/ReactProps";
import React from "react";

export interface Small extends ReactProps {
    className?: string;
}

export const Small = ({children, className, ...props}: Small) => {
    return (
        <small className={`Font-Light text-xs text-white text-center leading-3 block ${className}`} style={{ fontSize: "0.65rem" }}>
            {children}
        </small>
    )
}
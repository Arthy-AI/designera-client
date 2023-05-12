import {ReactProps} from "../../../interfaces/ReactProps";
import React from "react";

export const Small = ({children, ...props}: ReactProps) => {
    return (
        <small className="Font-Light text-xs text-white text-center leading-3 block py-2" style={{ fontSize: "0.65rem" }}>
            {children}
        </small>
    )
}
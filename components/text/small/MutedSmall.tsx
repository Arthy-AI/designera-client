import {ReactProps} from "../../../interfaces/ReactProps";
import React from "react";

export const MutedSmall = ({children, ...props}: ReactProps) => {
    return (
        <small className="Font-Light text-gray-400 text-center leading-3 block py-3 pb-6 italic" style={{ fontSize: "0.70rem" }}>
            {children}
        </small>
    )
}
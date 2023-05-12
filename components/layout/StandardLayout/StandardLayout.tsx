import React, {ReactNode} from "react";
import {ReactProps} from "../../../interfaces/ReactProps";

export const StandardLayout = ({children, ...props}: ReactProps) => {
    return (
        <div className="grid grid-cols-12 gap-2">
            {children}
        </div>
    )
}
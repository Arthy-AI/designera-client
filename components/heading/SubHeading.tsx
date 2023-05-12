import {ReactProps} from "../../interfaces/ReactProps";
import React from "react";

export const SubHeading = ({children, ...props}: ReactProps) => {
    return (
        <h1 className="text-lg md:text-1xl xl:text-2xl font-semibold text-white select-none pb-2">
            {children}
        </h1>
    )
}
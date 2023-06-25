import {ReactProps} from "../../interfaces/ReactProps";
import React from "react";

export const Heading = ({children, ...props}: ReactProps) => {
    return (
        <h1 className="text-xl pt-14 md:pt-6 md:text-3xl lg:text-4xl font-bold text-white text-center select-none pb-3 designera-text-shadow">
            {children}
        </h1>
    )
}

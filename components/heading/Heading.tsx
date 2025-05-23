import {ReactProps} from "../../interfaces/ReactProps";
import React from "react";

export const Heading = ({children, ...props}: ReactProps) => {
    return (
        <h1 className="text-xl pt-5 md:pt-6 md:text-2xl lg:text-3xl font-bold text-white text-center select-none pb-3 designera-text-shadow">
            {children}
        </h1>
    )
}

import {ReactProps} from "../../../interfaces/ReactProps";
import React from "react";

export const Content = ({children, ...props}: ReactProps) => {
    return (
        <div className="col-span-12 md:col-span-7 lg:col-span-8 2xl:col-span-9 flex flex-col">
            {children}
        </div>
    )
}

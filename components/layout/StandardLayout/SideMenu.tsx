import {ReactProps} from "../../../interfaces/ReactProps";
import React from "react";

export const SideMenu = ({children, ...props}: ReactProps) => {
    return (
        <div className="col-span-12 flex flex-col justify-between md:col-span-5 lg:col-span-4 2xl:col-span-3">
            {children}
        </div>
    )
}
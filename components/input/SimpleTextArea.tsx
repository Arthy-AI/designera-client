import {ReactProps} from "../../interfaces/ReactProps";
import React from "react";

interface SimpleTextArea extends ReactProps {
    labelText: string;
    placeholderText?: string;
    labelTagShow?: boolean;
    onValueChange?: (text: string) => void;
}

export const SimpleTextArea = ({children, labelText, placeholderText, labelTagShow, onValueChange, ...props}: SimpleTextArea) => {
    return (
        <div style={{ height: "85%" }}>
            {(labelTagShow || typeof labelTagShow == "undefined") && (<label className="Font-Regular text-white font-semibold" htmlFor={labelText.replaceAll(" ", "_")}>{labelText}</label>)}
            <textarea
                id={labelText.replaceAll(" ", "_")}
                className="Font-Medium min-h-full bg-[#3E3E3E] border border-[#6F6B6A] outline-0 text-white text-sm designera-rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholderText || labelText}
                onChange={(e) => {
                    return onValueChange && onValueChange(e.target.value)
                }}
            />
        </div>
    )
}
import {ReactProps} from "../../interfaces/ReactProps";
import React, {ReactElement} from "react";

interface FileInputArea extends ReactProps {
    body: ReactElement;
    id: string;
    onValueChange?: (files?: FileList) => void;
}

export const FileInputArea = ({ children, body, id, onValueChange, ...props }: FileInputArea) => {
    return (
        <div className="relative">
            <div
                className="h-72 w-full bg-[#5E5E5E] designera-rounded designera-box-shadow flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={(e) => {
                    document.getElementById(id)?.click();
                }}
            >
                {body}
            </div>
            <input
                className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer overflow-hidden"
                type="file"
                id={id}
                multiple={false}
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    return onValueChange && onValueChange(e.target.files || undefined);
                }}
            />
        </div>
    )
}
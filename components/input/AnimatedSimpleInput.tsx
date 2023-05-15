import {ReactProps} from "../../interfaces/ReactProps";
import React from "react";

interface AnimatedSimpleInput extends ReactProps {
    labelText: string;
    placeholderText?: string;
    className?: string;
    inputClassname?: string;
    labelClassname?: string;
    value?: string;
    onValueChange?: (text: string) => void;
    onInputBlur?: (text: string) => void;
    onSubmit?: () => void;
}

export const AnimatedSimpleInput = ({children, labelText, placeholderText, className, inputClassname, labelClassname, value, onValueChange, onInputBlur, onSubmit, ...props}: AnimatedSimpleInput) => {
    return (
        <div className={className}>
            <div className="relative">
                <input type="text" id={labelText.toLowerCase().replaceAll(" ", "_")}
                       value={value}
                       className={`Font-Medium block ${inputClassname?.includes("rounded") ? "" : "designera-rounded"} ${inputClassname?.includes("bg-") ? "" : "bg-[#3E3E3E]"} border border-[#6F6B6A] px-2.5 pb-2.5 pt-3 h-14 w-full text-sm text-gray-900 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 peer ${inputClassname}`}
                       placeholder=" "
                       onChange={(e) => {
                         return onValueChange && onValueChange(e.target.value)
                       }}
                       onBlur={(e) => {
                         return onInputBlur && onInputBlur(e.target.value)
                       }}
                       onKeyPress={(event) => {
                         if(event.key === 'Enter'){
                           onSubmit && onSubmit()
                         }
                       }}
                />
                <label htmlFor={labelText.toLowerCase().replaceAll(" ", "_")}
                       className={`Font-Light absolute ${labelClassname?.includes("text-") ? "" : "text-gray-500 text-sm"} duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${labelClassname}`}
                >
                    {labelText}
                </label>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">{placeholderText && placeholderText}</p>
        </div>
    )
}

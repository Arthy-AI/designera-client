import {ReactProps} from "../../interfaces/ReactProps";
import React from "react";

interface RadioButtons extends ReactProps {
    title: string,
    titleShow?: boolean,
    choices: string[],
    active: number
    column?: 3 | 2
    onValueChange?: (value: string, index: number) => void,
}

export const RadioButtons = ({children, title, titleShow, choices, active, column, onValueChange, ...props}: RadioButtons) => {
    return (
        <div
            className="bg-[#242424] flex h-9 w-full designera-rounded justify-between items-center mb-2">
            {(titleShow || typeof titleShow == "undefined") &&
                (<div
                    className={`Font-Regular flex justify-center items-center text-center ${column == 2 ? "w-1/2" : "w-1/4"} text-white select-none text-sm lg:text-base`}>{title}
                </div>)
            }

            {
                choices.map((v: string, i: number) => (
                    <button
                        key={i}
                        className={`Font-Medium flex justify-center items-center text-center h-full ${column == 2 ? "w-1/2" : "w-1/4"} designera-rounded ${active == i ? "text-white bg-[#3E3E3E]" : "text-[#656565] hover:bg-[#1E1E1E]"}`}
                        onClick={(e) => {
                            return onValueChange && onValueChange(v, i)
                        }}
                    >
                        {v}
                    </button>
                ))
            }
        </div>
    )
}

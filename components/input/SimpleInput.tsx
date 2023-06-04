import {ReactProps} from "../../interfaces/ReactProps";
import React, {useState} from "react";

interface SimpleInput extends ReactProps {
    id?: string;
    name?: string;
    labelText: string;
    placeholderText?: string;
    secondaryPlaceholderText?: string;
    type?: 'text' | 'password'
    labelTagShow?: boolean;
    value?: string;
    rounded?: boolean;
    className?: string;
    onValueChange?: (text: string) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const SimpleInput = ({children, id, name, labelText, placeholderText, secondaryPlaceholderText, type, labelTagShow, value, rounded, className, onValueChange, onChange, onBlur, onFocus, ...props}: SimpleInput) => {
  const [focus, setFocus] = useState(false)

  return (
        <div className="w-full">
            {(labelTagShow || typeof labelTagShow == "undefined") && (<label className="Font-Regular text-white pl-2 text-xs" htmlFor={labelText.replaceAll(" ", "_")}>{labelText}</label>)}
            <input
                id={id ? id : labelText.replaceAll(" ", "_")}
                name={name ? name : labelText.replaceAll(" ", "_")}
                className={`${!className?.includes("bg-") ? "bg-[#3E3E3E]" : ""} ${rounded || typeof rounded == "undefined" ? "designera-rounded" : ""} Font-Medium border border-[#6F6B6A] outline-0 ${focus && secondaryPlaceholderText ? "placeholder-gray text-white text-sm" : "text-white text-sm"} focus:ring-[#FF8924] focus:border-[#FF8924] focus:bg-[#212121] block w-full p-2.5 placeholder-gray-700 ` + className}
                type={type}
                placeholder={ focus ? secondaryPlaceholderText || labelText : placeholderText || labelText }
                onChange={(e) => {
                  onValueChange && onValueChange(e.target.value)
                  onChange && onChange(e)
                }}
                onBlur={(e) => {
                  setFocus(false)
                  onBlur && onBlur(e)
                }}
                onFocus={(e) => {
                  setFocus(true)
                  onFocus && onFocus(e)
                }}
                value={value}
            />
        </div>
    )
}

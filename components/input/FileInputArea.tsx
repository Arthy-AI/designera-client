import React, { ReactElement } from "react";
import loadImage from 'blueimp-load-image';

interface FileInputAreaProps {
    body: ReactElement;
    id: string;
    onValueChange?: (file?: File) => void;
}

export const FileInputArea = ({ body, id, onValueChange }: FileInputAreaProps) => {
    const processImage = (file: File) => {
        loadImage(
            file,
            (eventOrImage: HTMLCanvasElement | Event | HTMLImageElement) => {
                if (eventOrImage instanceof HTMLCanvasElement) {
                    eventOrImage.toBlob((blob: Blob | null) => {
                        if (blob && onValueChange) {
                            onValueChange(new File([blob], file.name, { type: file.type }));
                        }
                    }, file.type);
                }
                // Optionally handle other cases (Event or HTMLImageElement) if needed
            },
            { orientation: true, canvas: true }
        );
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            processImage(files[0]);
        }
    };

    return (
        <div className="relative designera-rounded bg-[#5E5E5E] hover:bg-[#6E6E6E]">
            <div
                className="flex w-full designera-rounded designera-box-shadow flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={() => document.getElementById(id)?.click()}
            >
                {body}
            </div>
            <input
                className="absolute top-0 left-0 w-full opacity-0 cursor-pointer overflow-hidden"
                type="file"
                id={id}
                multiple={false}
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
            />
        </div>
    );
};

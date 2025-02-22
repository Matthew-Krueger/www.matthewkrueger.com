"use client";

import React, { useRef } from "react";

interface CsvUploaderProps {
    onFileSelectAction: (file: File) => void;
}

export function CsvUploader({ onFileSelectAction }: CsvUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        onFileSelectAction(file);

        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset input
        }
    };

    return (
        <input
            type="file"
            accept=".csv,text/csv"
            ref={fileInputRef}
            onChange={handleFileChange}
        />
    );
}
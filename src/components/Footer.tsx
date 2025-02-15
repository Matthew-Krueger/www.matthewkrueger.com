import React from 'react';
import {ModeToggle} from "@/components/ThemeToggleMenu";

export const Footer = () => {
    return (
        <>
            <footer
                className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 w-full row-start-3 gap-4 sm:gap-8 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 shadow-lg px-4 sm:px-8 py-4 rounded-3xl mt-auto">
                <div className="text-center sm:text-left">Copyright &copy; 2025 - Matthew Krueger</div>
                <div className="flex flex-row justify-evenly items-center w-60 sm:mt-0">
                    <div>Change Theme:</div>
                    <div><ModeToggle/></div>
                </div>
            </footer>
        </>
    );
};
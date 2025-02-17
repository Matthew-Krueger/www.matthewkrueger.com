import React from 'react';
import {ModeToggle} from "@/components/ThemeToggleMenu";

export const Footer = () => {
    return (
        <>
            <div className="flex-grow"/>
            <footer
                className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 w-full gap-4 sm:gap-8 text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-900 shadow-lg px-4 sm:px-8 py-4 rounded-3xl mb-4">
                <div className="text-center sm:text-left">Copyright &copy; 2025 - Matthew Krueger</div>
                <div className="flex flex-row justify-evenly items-center w-60 sm:mt-0">
                    <div>Change Theme:</div>
                    <div><ModeToggle/></div>
                </div>
            </footer>
        </>
    );
};
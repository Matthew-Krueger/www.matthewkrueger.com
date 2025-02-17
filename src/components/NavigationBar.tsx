"use client"

import React, {useState} from "react";
import HamburgerButton from "./HamburgerButton";
import NavbarList from "@/components/NavbarList";
import {cn} from "@/lib/utils";

const Navbar: React.FC = () => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    return (<>
        <nav className={cn(
            "fixed top-4 left-1/2 transform -translate-x-1/2 flex flex-col max-w-[1240px] w-[90%] px-4 rounded-3xl shadow-lg text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 overflow-hidden",
            hamburgerOpen ? "min-h-[200px]" : "h-16"
        )}>
            <div className="flex justify-between items-center w-full h-16">
                <h1 className="text-2xl md:text-3xl font-bold px-5">Matthew Krueger</h1>
                <NavbarList isMobile={false} />
                <HamburgerButton onClick={() => setHamburgerOpen(!hamburgerOpen)} isOpen={hamburgerOpen} />
            </div>
            <NavbarList isMobile={true} open={hamburgerOpen} />
        </nav>
        <div className="h-12"></div>
    </>);
};

export default Navbar;
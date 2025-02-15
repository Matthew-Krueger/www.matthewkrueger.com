"use client"

import React, {useState} from "react";
import clsx from "clsx";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {NavItem} from "@/lib/types";

// Array containing navigation items
const navItems: Array<NavItem> = [
    {label: <>Home</>, link: '/', key: "DefaultHomePageLink"},
    {label: <>About</>, link: '/about', key: "DefaultAboutPageLink"},
];

const NavbarEntry = ({navItem}: {navItem: NavItem}) => {
    return (
        <Link href={navItem.link} className="px-3 py-2 rounded-md text-sm font-medium">
            {navItem.label}
        </Link>
    );
}

const Navbar: React.FC = () => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    return <>
        <nav className={clsx(
            "fixed top-4 left-1/2 transform -translate-x-1/2 flex flex-col max-w-[1240px] w-full px-4 rounded-3xl shadow-lg text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 overflow-hidden",
            hamburgerOpen ? "min-h-[200px]" : "h-16"
        )}>
            <div className="flex justify-between items-center w-full h-16">
                <h1 className="text-gray-900 dark:text-gray-100 text-3xl font-bold px-5">Matthew Krueger</h1>

                <ul className='hidden md:flex'>
                    {navItems.map(item => (
                        <li
                            key={item.key}
                            className='p-4 bg-blue-100 dark:bg-blue-900 hover:bg-blue-900 dark:hover:bg-blue-100 text-gray-900 dark:text-gray-100 hover:text-gray-100 dark:hover:text-gray-900 rounded-3xl m-2 cursor-pointer '
                        >
                            <NavbarEntry navItem={item}/>
                        </li>
                    ))}
                </ul>

                <Button onClick={() => {setHamburgerOpen(!hamburgerOpen)}} className='block md:hidden'>
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {hamburgerOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </Button>
            </div>

            <ul
                className={clsx(
                    'w-full bg-gray-100 dark:bg-gray-900 overflow-hidden transition-opacity duration-300',
                    hamburgerOpen ? 'opacity-100' : 'opacity-0 max-h-0 pointer-events-none'
                )}
            >
                {/* Mobile Navigation Items */}
                {navItems.map(item => (
                    <li
                        key={item.key}
                        className='p-4 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 duration-300 hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer'
                    >
                        <NavbarEntry navItem={item}/>
                    </li>
                ))}
            </ul>
        </nav>
    </>;

};

export default Navbar;
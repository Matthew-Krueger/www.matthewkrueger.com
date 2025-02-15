import React from "react";
import Link from "next/link";
import { NavItem } from "@/lib/types";
import {cn} from "@/lib/utils"; // Assuming you have a types file where NavItem is defined

const navItems: NavItem[] = [
    {label: <>Home</>, link: '/', key: "DefaultHomePageLink"},
    {label: <>About</>, link: '/about', key: "DefaultAboutPageLink"},
];

const NavbarList = React.memo(({ isMobile, open }: { isMobile: boolean; open?: boolean }) => {
    return (
        <ul className={cn(
            isMobile ? 'w-full bg-gray-100 dark:bg-gray-900 overflow-hidden transition-opacity duration-300' : 'hidden md:flex',
            open ? 'opacity-100' : isMobile ? 'opacity-0 max-h-0 pointer-events-none' : ''
        )}>
            {navItems.map(item => (
                <Link href={item.link} key={item.key}>
                    <li className={cn(
                        isMobile ? 'p-4 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 duration-300 hover:text-blue-900 dark:hover:text-blue-100 cursor-pointer'
                            : 'p-4 bg-blue-100 dark:bg-blue-900 hover:bg-blue-900 dark:hover:bg-blue-100 text-gray-900 dark:text-gray-100 hover:text-gray-100 dark:hover:text-gray-900 rounded-3xl m-2 cursor-pointer'
                    )}>
                        <span className="px-3 py-2 rounded-md text-sm font-medium">
                            {item.label}
                        </span>
                    </li>
                </Link>
            ))}
        </ul>
    );
});
NavbarList.displayName = "NavbarList";

export default NavbarList;
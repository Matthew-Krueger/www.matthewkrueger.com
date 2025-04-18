import React, {useMemo} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

import navItems from "@/lib/navbaritems";

function standardizeUrl(url: string): string {
    // Remove trailing slashes
    url = url.replace(/\/+$/, '');

    // Convert to lowercase for case-insensitive comparison
    url = url.toLowerCase();

    // Decode URI to handle any encoded characters
    url = decodeURIComponent(url);

    return url;
}

const NavbarList = React.memo(({ isMobile, open }: { isMobile: boolean; open?: boolean }) => {
    const pathname = usePathname(); // Get the current pathname
    const standardizedPathName = useMemo(() => standardizeUrl(pathname), [pathname]);

    return (
        <ul className={cn(
            isMobile ? 'w-full overflow-hidden transition-opacity duration-300' : 'hidden md:flex',
            open ? 'opacity-100' : isMobile ? 'opacity-0 max-h-0 pointer-events-none' : ''
        )}>
            {navItems.map(item => {
                const activeLink = standardizeUrl(item.link) === standardizedPathName;

                return <Link href={item.link} key={item.key}>
                    <li
                        className={cn(
                            // Common styles for all states
                            "cursor-pointer p-2 py-1 my-2 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",

                            // Device-specific styles
                            isMobile
                                ? "rounded-xl duration-300 text-slate-900 dark:text-slate-100"
                                : "rounded-3xl m-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100",

                            // State-specific styles
                            activeLink && "bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900"
                        )}
                    >
                        <button className="px-3 py-2 rounded-md text-sm font-medium">
                            {item.label}
                        </button>
                    </li>
                </Link>
            })}
        </ul>
    );
});
NavbarList.displayName = "NavbarList";

export default NavbarList;
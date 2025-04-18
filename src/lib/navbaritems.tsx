import {NavItem} from "@/lib/types";
import React from "react";

const navItems: NavItem[] = [
    {label: <>Home</>, link: '/', key: "DefaultHomePageLink"},
    {label: <>About</>, link: '/about', key: "DefaultAboutPageLink"},
    {label: <>Blog</>, link: '/blog', key: "BlogPageLink"},
];

export default navItems;
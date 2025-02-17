import React from "react";

export type NavItem = {
    label: React.ReactElement,
    link: string,
    key: string
};

export type Dependency = {
    name: string,
    url: string,
    heading?: string,
    version?:string,
    license?: string
};
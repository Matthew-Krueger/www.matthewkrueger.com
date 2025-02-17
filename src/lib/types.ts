import React from "react";

export type NavItem = {
    label: React.ReactElement,
    link: string,
    key: string
};

export type Dependency = {
    name: React.ReactElement,
    url: string,
    heading?: React.ReactElement,
    version?:React.ReactElement,
    license?: React.ReactElement
};
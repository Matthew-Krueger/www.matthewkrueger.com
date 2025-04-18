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

export interface Frontmatter {
    title: string;
    description?: string;
    slug?: string;
    date: string | Date;
    author?: string;
    categories?: string[];
    weight?: number;
}

export interface Post {
    slug: string;
    frontmatter: Frontmatter;
}

export interface PostProps {
    frontmatter: Frontmatter;
    content: string;
}
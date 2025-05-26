import React from "react";
import {Dependency} from "@/lib/types";
import DependencyItem from "@/components/DependencyItem";
import StaticSection from "@/components/StaticSection";

const hosting: Dependency[] = [
    {
        name: <span>Vercel</span>,
        url: "https://vercel.com",
        heading: <span>Hosted by</span>,
    },
    {
        name: <span>ProtonMail</span>,
        url: "https://proton.me/mail",
        heading: <span>Secure Email by</span>,
    },
    {
        name: <span>Bun.sh</span>,
        url: "https://bun.sh",
        heading: <span>Proudly Served by<br />&<br />Developed with</span>,
    },
];

const dependencies: Dependency[] = [
    {
        name: <span>@mdx-js/react</span>,
        url: "https://www.npmjs.com/package/@mdx-js/react",
        version: <span>^3.1.0</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>@next/mdx</span>,
        url: "https://www.npmjs.com/package/@next/mdx",
        version: <span>^15.3.2</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>@radix-ui/react-dropdown-menu</span>,
        url: "https://www.npmjs.com/package/@radix-ui/react-dropdown-menu",
        version: <span>^2.1.6</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>@radix-ui/react-slot</span>,
        url: "https://www.npmjs.com/package/@radix-ui/react-slot",
        version: <span>^1.2.0</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>@radix-ui/react-tabs</span>,
        url: "https://www.npmjs.com/package/@radix-ui/react-tabs",
        version: <span>^1.1.3</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>@tanstack/react-table</span>,
        url: "https://www.npmjs.com/package/@tanstack/react-table",
        version: <span>^8.21.2</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>@vercel/speed-insights</span>,
        url: "https://www.npmjs.com/package/@vercel/speed-insights",
        version: <span>^1.2.0</span>,
        license: <span>Apache-2.0</span>,
    },
    {
        name: <span>class-variance-authority</span>,
        url: "https://www.npmjs.com/package/class-variance-authority",
        version: <span>^0.7.1</span>,
        license: <span>Apache-2.0</span>,
    },
    {
        name: <span>clsx</span>,
        url: "https://www.npmjs.com/package/clsx",
        version: <span>^2.1.1</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>gray-matter</span>,
        url: "https://www.npmjs.com/package/gray-matter",
        version: <span>^4.0.3</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>lucide-react</span>,
        url: "https://www.npmjs.com/package/lucide-react",
        version: <span>^0.475.0</span>,
        license: <span>ISC</span>,
    },
    {
        name: <span>next</span>,
        url: "https://www.npmjs.com/package/next",
        version: <span>15.3.2</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>next-themes</span>,
        url: "https://www.npmjs.com/package/next-themes",
        version: <span>^0.4.6</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>papaparse</span>,
        url: "https://www.npmjs.com/package/papaparse",
        version: <span>^5.5.3</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>react</span>,
        url: "https://www.npmjs.com/package/react",
        version: <span>^19.1.0</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>react-dom</span>,
        url: "https://www.npmjs.com/package/react-dom",
        version: <span>^19.1.0</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>react-icons</span>,
        url: "https://www.npmjs.com/package/react-icons",
        version: <span>^5.5.0</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>recharts</span>,
        url: "https://www.npmjs.com/package/recharts",
        version: <span>^2.15.1</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>remark</span>,
        url: "https://www.npmjs.com/package/remark",
        version: <span>^15.0.1</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>remark-mdx</span>,
        url: "https://www.npmjs.com/package/remark-mdx",
        version: <span>^3.1.0</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>remark-html</span>,
        url: "https://www.npmjs.com/package/remark-html",
        version: <span>^16.0.1</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>tailwind-merge</span>,
        url: "https://www.npmjs.com/package/tailwind-merge",
        version: <span>^3.0.1</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>tailwindcss-animate</span>,
        url: "https://www.npmjs.com/package/tailwindcss-animate",
        version: <span>^1.0.7</span>,
        license: <span>MIT</span>,
    },
];

const devDependencies: Dependency[] = [
    {
        name: <span>@eslint/eslintrc</span>,
        url: "https://www.npmjs.com/package/@eslint/eslintrc",
        version: <span>^3.2.0</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>@types/node</span>,
        url: "https://www.npmjs.com/package/@types/node",
        version: <span>^20.17.19</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>@types/papaparse</span>,
        url: "https://www.npmjs.com/package/@types/papaparse",
        version: <span>^5.3.15</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>@types/react</span>,
        url: "https://www.npmjs.com/package/@types/react",
        version: <span>^19.0.10</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>@types/react-dom</span>,
        url: "https://www.npmjs.com/package/@types/react-dom",
        version: <span>^19.0.4</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>eslint</span>,
        url: "https://www.npmjs.com/package/eslint",
        version: <span>^9.20.1</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>eslint-config-next</span>,
        url: "https://www.npmjs.com/package/eslint-config-next",
        version: <span>15.1.7</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>postcss</span>,
        url: "https://www.npmjs.com/package/postcss",
        version: <span>^8.5.3</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>tailwindcss</span>,
        url: "https://www.npmjs.com/package/tailwindcss",
        version: <span>^3.4.17</span>,
        license: <span>MIT</span>,
    },
    {
        name: <span>typescript</span>,
        url: "https://www.npmjs.com/package/typescript",
        version: <span>^5.7.3</span>,
        license: <span>Apache-2.0</span>,
    },
];

const About = () => {
    return (
        <>
                <StaticSection>
                    <h1 className="text-4xl font-bold mb-4 text-center">About Me</h1>
                    <div className="flex flex-col sm:flex-row items-center">
                        <h3 className="text-lg text-center sm:text-left">Emerging Computer Science Professional</h3>
                        <span className="hidden sm:inline-block mx-2">|</span>
                        <h3 className="text-lg text-center sm:text-left">React & Typescript Dev</h3>
                        <span className="hidden sm:inline-block mx-2">|</span>
                        <h3 className="text-lg text-center sm:text-left">Entrepreneur</h3>
                    </div>
                </StaticSection>


                <StaticSection>
                    <h2 className="text-3xl font-bold text-center">Tech Stack</h2>
                    <h3 className="text-2xl font-bold mt-8 text-center">Hosting</h3>
                        <DependencyList dependencies={hosting}/>
                    <h3 className="text-2xl font-bold mt-8 text-center">Dependencies</h3>
                        <DependencyList dependencies={dependencies}/>
                    <h2 className="text-2xl font-bold mt-8 text-center">Development Dependencies</h2>
                        <DependencyList dependencies={devDependencies}/>
                </StaticSection>

        </>
    );
};

const DependencyList = React.memo(({dependencies}: { dependencies: Dependency[] }) => (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
        {dependencies.map((dependency) => (
            <DependencyItem key={dependency.url} {...dependency}/>
        ))}
    </div>
))
DependencyList.displayName = "DependencyList";

export default About;
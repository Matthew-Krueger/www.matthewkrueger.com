import React from "react";
import Navbar from "@/components/NavigationBar";
import {Footer} from "@/components/Footer";
import {Dependency} from "@/lib/types";
import DependencyItem from "@/components/DependencyItem";

const hosting: Dependency[] = [
    {
        heading: "Hosted by",
        name: "Vercel",
        url: "https://vercel.com"
    },
    {
        heading: "Secure Email by",
        name: "ProtonMail",
        url: "https://protonmail.com"
    },
    {
        heading: "Proudly Served by<br>&amp;<br>Developed with",
        name: "Bun.sh",
        url: "https://bun.sh"
    }
];

const dependencies: Dependency[] = [
    {
        name: "@radix-ui/react-dropdown-menu",
        url: "https://www.npmjs.com/package/@radix-ui/react-dropdown-menu",
        version: "^2.1.6",
        license: "MIT"
    },
    {
        name: "@radix-ui/react-slot",
        url: "https://www.npmjs.com/package/@radix-ui/react-slot",
        version: "^1.1.2",
        license: "MIT"
    },
    {
        name: "@radix-ui/react-tabs",
        url: "https://www.npmjs.com/package/@radix-ui/react-tabs",
        version: "^1.1.3",
        license: "MIT"
    },
    {
        name: "class-variance-authority",
        url: "https://www.npmjs.com/package/class-variance-authority",
        version: "^0.7.1",
        license: "Apache 2.0"
    },
    {
        name: "clsx",
        url: "https://www.npmjs.com/package/clsx",
        version: "^2.1.1",
        license: "MIT"
    },
    {
        name: "lucide-react",
        url: "https://www.npmjs.com/package/lucide-react",
        version: "^0.475.0",
        license: "ISC"
    },
    {
        name: "next",
        url: "https://www.npmjs.com/package/next",
        version: "15.1.7",
        license: "MIT"
    },
    {
        name: "next-themes",
        url: "https://www.npmjs.com/package/next-themes",
        version: "^0.4.4",
        license: "MIT"
    },
    {
        name: "react",
        url: "https://www.npmjs.com/package/react",
        version: "^19.0.0",
        license: "MIT"
    },
    {
        name: "react-dom",
        url: "https://www.npmjs.com/package/react-dom",
        version: "^19.0.0",
        license: "MIT"
    },
    {
        name: "react-icons",
        url: "https://www.npmjs.com/package/react-icons",
        version: "^5.4.0",
        license: "MIT"
    },
    {
        name: "tailwind-merge",
        url: "https://www.npmjs.com/package/tailwind-merge",
        version: "^3.0.1",
        license: "MIT"
    },
    {
        name: "tailwindcss-animate",
        url: "https://www.npmjs.com/package/tailwindcss-animate",
        version: "^1.0.7",
        license: "MIT"
    },
    {
        name: "bun",
        url: "https://bun.sh",
        version: "latest",  // Bun doesn't specify version in npm, using 'latest' as a placeholder
        license: "MIT"
    }
];

const devDependencies: Dependency[] = [
    {
        name: "@eslint/eslintrc",
        url: "https://www.npmjs.com/package/@eslint/eslintrc",
        version: "^3",
        license: "MIT"
    },
    {
        name: "@types/node",
        url: "https://www.npmjs.com/package/@types/node",
        version: "^20",
        license: "MIT"
    },
    {
        name: "@types/react",
        url: "https://www.npmjs.com/package/@types/react",
        version: "^19",
        license: "MIT"
    },
    {
        name: "@types/react-dom",
        url: "https://www.npmjs.com/package/@types/react-dom",
        version: "^19",
        license: "MIT"
    },
    {
        name: "eslint",
        url: "https://www.npmjs.com/package/eslint",
        version: "^9",
        license: "MIT"
    },
    {
        name: "eslint-config-next",
        url: "https://www.npmjs.com/package/eslint-config-next",
        version: "15.1.7",
        license: "MIT"
    },
    {
        name: "postcss",
        url: "https://www.npmjs.com/package/postcss",
        version: "^8",
        license: "MIT"
    },
    {
        name: "tailwindcss",
        url: "https://www.npmjs.com/package/tailwindcss",
        version: "^3.4.17",
        license: "MIT"
    },
    {
        name: "typescript",
        url: "https://www.npmjs.com/package/typescript",
        version: "^5",
        license: "Apache 2.0"
    }
];

const About = () => {
    return (
        <div className="motion-background flex flex-col min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-slate-950 dark:text-slate-50">
            <Navbar/>
            <main className="flex-grow flex flex-col items-center justify-center mt-12">
                <h1 className="text-4xl font-bold mb-4 text-center">About Me</h1>
                <div className="flex flex-col sm:flex-row items-center">
                    <h3 className="text-lg text-center sm:text-left">Emerging Computer Science Professional</h3>
                    <span className="hidden sm:inline-block mx-2">|</span>
                    <h3 className="text-lg text-center sm:text-left">React & Typescript Dev</h3>
                    <span className="hidden sm:inline-block mx-2">|</span>
                    <h3 className="text-lg text-center sm:text-left">Entrepreneur</h3>
                </div>

                <section className="mt-8 bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50 p-6 rounded-3xl">
                    <h2 className="text-3xl font-bold text-center">Tech Stack</h2>
                    <h3 className="text-2xl font-bold mt-8 text-center">Hosting</h3>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {hosting.map((dependency) => (
                            <DependencyItem key={dependency.name + dependency.version} {...dependency}/>
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold mt-8 text-center">Dependencies</h3>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {dependencies.map((dependency) => (
                            <DependencyItem key={dependency.name + dependency.version} {...dependency}/>
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold mt-8 text-center">Development Dependencies</h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {devDependencies.map((dependency) => (
                            <DependencyItem key={dependency.name + dependency.version} {...dependency}/>
                        ))}
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
};

export default About;
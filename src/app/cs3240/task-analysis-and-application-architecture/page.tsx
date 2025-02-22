import {Footer} from "@/components/Footer";
import Navbar from "@/components/NavigationBar";
import StaticSection from "@/components/StaticSection";
import React from "react";
import TaskAnalysisAndApplicationArchitecture_Client
    from "@/app/cs3240/task-analysis-and-application-architecture/pageClient";



export default function TaskAnalysisAndApplicationArchitecture() {
    return (
        <div className="motion-background flex flex-col min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-slate-950 dark:text-slate-50">
            <Navbar/>
            <main className="flex-grow flex flex-col items-center justify-center mt-12">

                <StaticSection>
                    <h1 className="text-4xl font-bold mb-4 text-center">CS 3240 - Usability Engineering</h1>
                    <h2 className="text-2xl font-bold text-center">Task Analysis & Application Architecture Demo</h2>
                    <p>No data leaves your device. All processing happens on the client.</p>
                </StaticSection>

                <TaskAnalysisAndApplicationArchitecture_Client />

            </main>
            <Footer/>
        </div>
    );
}


/*
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="invert dark:invert-0"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
 */
import Navbar from "@/components/NavigationBar";
import {Footer} from "@/components/Footer";
import React from 'react';

export default function PageBase({ children }: { children: React.ReactNode }){
    return (
        <div
            className="motion-background flex flex-col min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-slate-950 dark:text-slate-50">
            <Navbar/>
            <main className="flex-grow flex flex-col items-center justify-center mt-12">
                {children}
            </main>
            <Footer/>
        </div>
    );
};
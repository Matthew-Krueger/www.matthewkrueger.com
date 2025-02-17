import React from "react";
import Navbar from "@/components/NavigationBar";
import {Footer} from "@/components/Footer";

const About = () => {
    return (
        <div className="motion-background flex flex-col min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
            </main>
            <Footer/>
        </div>
    );
};

export default About;
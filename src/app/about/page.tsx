import React from "react";
import Navbar from "@/components/NavigationBar";
import {Footer} from "@/components/Footer";

const About = () => {
    return (<>
            <div
                className="flex flex-col items-center justify-between min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <Navbar/>
                <div className="md:mt-0 mt-8"/>
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-center text-lg max-w-2xl">
                    Welcome to my website!
                </p>
                <Footer/>
            </div>

        </>
    );
};

export default About;
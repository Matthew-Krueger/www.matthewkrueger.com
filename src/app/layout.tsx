import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/ThemeProvider";
import {SpeedInsights} from "@vercel/speed-insights/react";
import PageBase from "@/components/PageBase";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matthew Krueger",
  description: "Emerging Computer Science Professional | Entrepreneur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <SpeedInsights />
      <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
      >
          <PageBase>
          {children}
         </PageBase>
      </ThemeProvider>
      </body>
    </html>
  );
}

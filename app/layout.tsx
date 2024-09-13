import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import {fugaz} from '../utils/fonts'
import "./globals.css";
// import { Header } from "next/dist/lib/load-custom-routes";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Logout from "@/components/Logout";

const openSans = Open_Sans({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Broodl",
  description: "Track your daily mood every day of the year",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-7">
      <Link href={'/'}>
        <h1 className={"text-base sm:text-lg textGradient " + fugaz.className}>Broodl</h1>
      </Link>
      <Logout />
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={"text-indigo-400 " + fugaz.className}>
        Created with love
      </p>
    </footer>
  )


  return (
    <html lang="en">
      <AuthProvider>
        <body className={'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800' + ' ' + openSans.className}>
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}

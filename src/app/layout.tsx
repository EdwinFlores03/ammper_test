"use client"
import { Montserrat } from "next/font/google";
import "./globals.css";
const montserrat = Montserrat({ subsets: ["latin"] });
// import { UserProvider } from '../context/UserContext'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                {/* <UserProvider> */}
                    {children}
                {/* </UserProvider> */}
            </body>
        </html>
    );
}

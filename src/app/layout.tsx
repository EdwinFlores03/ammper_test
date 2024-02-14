import { Montserrat } from "next/font/google";
import "./globals.css";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
    title: "Ammper Test",
    description: "Prueba tecnica de ammper",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
          <body className={montserrat.className}>{children}</body>
        </html>
    );
}

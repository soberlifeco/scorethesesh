import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Score The Sesh",
  description:
    "Score The Sesh is a daily party review series — drinking sessions, raves, afterparties and festivals scored on Music, Substances, Location & Characters. Get the free 7 Day Rise Guide.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0A0A0A]">
        <NavBar />
        {children}
      </body>
    </html>
  );
}

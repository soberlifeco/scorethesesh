import type { Metadata } from "next";
import { Space_Grotesk, Inter, Rock_Salt } from "next/font/google";
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

const rockSalt = Rock_Salt({
  variable: "--font-chalk",
  subsets: ["latin"],
  weight: "400",
});

const SITE_URL = "https://scorethesesh.com";
const DESCRIPTION =
  "Score The Sesh — parties, raves, afters and festivals, scored on Music, Substances, Vibes, Hangover and WTF. New episode every single day.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Score The Sesh",
  description: DESCRIPTION,
  openGraph: {
    title: "Score The Sesh",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Score The Sesh",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Score The Sesh",
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${rockSalt.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0A0A0A]">
        <NavBar />
        {children}
      </body>
    </html>
  );
}

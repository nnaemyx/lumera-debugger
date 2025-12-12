import type { Metadata } from "next";
import { Titillium_Web, Open_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/contexts/WalletContext";

const titilliumWeb = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flux - Fluid DeFi Experience",
  description:
    "Flow with the flux of decentralized finance. A fluid platform for staking, governance, and token management on the Cosmos ecosystem. Experience seamless DeFi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${titilliumWeb.variable} ${openSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}

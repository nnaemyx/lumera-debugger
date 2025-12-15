import type { Metadata } from "next";
import { Orbitron, Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/contexts/WalletContext";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumera Rank | Address Leaderboard",
  description:
    "Top performing addresses on the Lumera network by transactions, gas, and volume.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${inter.variable} ${rajdhani.variable} antialiased`}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Raleway, Nunito, Fira_Code, Outfit, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/contexts/WalletContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WalletWatch - Multi-Wallet Watchlist",
  description:
    "Track multiple wallet addresses in one dashboard. Monitor balances, transactions, and activity across all your watched wallets on Lumera Testnet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${dmSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}

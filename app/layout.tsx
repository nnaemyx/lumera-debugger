import type { Metadata } from "next";
import { Space_Mono, Fira_Code } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/contexts/WalletContext";

const spaceMono = Space_Mono({
  variable: "--font-heading",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumera HexVault | Decoder",
  description:
    "Real-time hex string decoding and analysis tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${firaCode.variable} antialiased`}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}

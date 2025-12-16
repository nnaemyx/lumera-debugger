import type { Metadata } from "next";
import { Work_Sans, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/contexts/WalletContext";

const workSans = Work_Sans({
  variable: "--font-heading",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumera BlockLab | Simulator",
  description:
    "Interactive Block Hashing and Mining Simulator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${sourceCodePro.variable} antialiased`}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}

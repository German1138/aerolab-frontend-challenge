import "./globals.css";

import Head from "next/head";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaming Haven Z - Organize & Discover Video Games",
  description:
    "Search and organize your favorite video games using IGDB API. Track your collection and discover new titles easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <Head>
        <meta name="robots" content="index, follow" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

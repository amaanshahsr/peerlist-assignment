import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Form Builder",
  description: "Created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter?.className} antialiased grid  mx-auto grid-cols-[screen] sm:grid-cols-[40rem] place-content-center px-5`}
      >
        {children}
      </body>
    </html>
  );
}

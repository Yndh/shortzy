import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextAuthSessionProvider from "@/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shortzy | URL Shortener for Shareable Links",
  description:
    "Shorten URLs instantly and share them with Shortzy, the user-friendly URL shortener app.",
  keywords: ["URL shortener", "link shortener", "short link", "URL management"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            theme="dark"
            pauseOnHover
            draggable
          />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

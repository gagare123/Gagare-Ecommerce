"use client"

import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>QuickCart - GreatStack</title>
          <meta name="description" content="E-Commerce with Next.js" />
        </head>
        <body className={`${outfit.className} antialiased text-gray-700`}>
          <Toaster />
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>     
  );
}


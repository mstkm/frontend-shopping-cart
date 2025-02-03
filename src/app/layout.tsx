"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
    
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <div className="flex">
              <div className="h-screen min-w-fit w-[18rem] border-r-1 shadow-md">
                <div className="flex items-center justify-center p-4">
                  <h1 className="font-bold">Dashboard</h1>
                </div>
                
              </div>
              <section>{children}</section>
            </div>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

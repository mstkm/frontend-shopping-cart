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
      <head>
        <title>AppLap</title>
        <meta name="description" content="Electronic Shop" />
      </head>
      <body className={`${montserrat.className}`}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <section>
              {children}
            </section>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { Suspense } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import Loading from "./loading";
import QueryProvider from "@/providers/query-provider";
import { ToastProvider } from "@/providers/toaster-provider";
import { ConfettiProvider } from "@/providers/confetti-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Management System",
  description: "Create an account to access courses and start learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConfettiProvider />
          <ToastProvider />
          <QueryProvider>{children}</QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}

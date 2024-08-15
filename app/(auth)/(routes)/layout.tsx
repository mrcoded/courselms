import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../../globals.css";

export const metadata = {
  title: "Threads",
  description: "A Next.JS 14 Meta Threads Application",
};

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{}} signInFallbackRedirectUrl="/">
      <html lang="en">
        <body className={`${inter.className}`}>
          <div className="h-full flex justify-center items-center ">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

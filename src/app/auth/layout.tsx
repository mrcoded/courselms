import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Auth - Course LMS",
  description: "Create an account to access courses and start learning.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center w-full h-full">
      {children}
    </main>
  );
}

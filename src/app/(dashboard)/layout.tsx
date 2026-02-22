import { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import "../globals.css";

import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/navbar";

import { getServerSession } from "@/lib/get-server-session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Management System",
  description: "Create an account to access courses and start learning.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // Redirect if not logged in
  if (!session) redirect("/auth/login");

  return (
    <div className="h-full">
      <div className="h-[80px] lg:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden lg:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="lg:pl-56 pt-[80px] h-full w-full max-w-screen-2xl mx-auto">
        {children}
      </main>
    </div>
  );
}

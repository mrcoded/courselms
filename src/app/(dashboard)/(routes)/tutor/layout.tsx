import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/get-server-session";

export default async function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const user = session?.user;
  const userId = user?.id;

  // Redirect if not logged in
  if (!userId) redirect("/auth/login");

  // If a tutor tries to enter the student dashboard
  if (session?.user.role === "student") {
    return redirect("/dashboard");
  }

  return <>{children}</>;
}

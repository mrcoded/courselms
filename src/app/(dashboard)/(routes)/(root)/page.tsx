import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/get-server-session";

const HomePage = async () => {
  const session = await getServerSession();
  const userId = session?.user?.id;

  const role = session?.user?.role;

  // Redirect if not logged in
  if (!userId) redirect("/auth/login");

  // If user role is a tutor redirect
  if (role === "tutor") redirect("/tutor/courses");

  // If user role is student redirect
  if (role === "student") redirect("/dashboard");
};

export default HomePage;

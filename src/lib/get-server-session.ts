import { cache } from "react";
import { auth } from "@/config/auth";
import { headers } from "next/headers";

export const getServerSession = cache(async () => {
  try {
    // This hits the DB, but only once because of cache()
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session;
  } catch (error) {
    return null;
  }
});

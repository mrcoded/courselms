import { db } from "@/config/db";
import { Category } from "@prisma/client";

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
};

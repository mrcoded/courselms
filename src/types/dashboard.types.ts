import { Category } from "@prisma/client";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export interface DashboardInfoCardProps {
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
  variant?: "default" | "success";
}

export interface AnalyticsDataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

export interface AnalyticsChartsProps {
  data: {
    name: string;
    total: number;
  }[];
}

export interface SearchPageProps {
  searchParams: Promise<{
    title: string;
    categoryId: string;
  }>;
}

export interface CategoriesProps {
  items: Category[];
}

export interface CategoryItemProps {
  label: string;
  icon: IconType;
  value: string;
}

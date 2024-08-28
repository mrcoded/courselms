"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcMusic,
  FcFilmReel,
  FcMultipleDevices,
  FcSalesPerformance,
  FcSportsMode,
  FcOldTimeCamera,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const IconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Engineering: FcEngineering,
  Photography: FcOldTimeCamera,
  Accounting: FcSalesPerformance,
  Filming: FcFilmReel,
  Fitness: FcSportsMode,
  "Computer Science": FcMultipleDevices,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={IconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

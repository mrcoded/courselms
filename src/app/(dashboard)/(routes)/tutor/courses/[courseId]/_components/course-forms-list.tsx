import React from "react";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import type { Course } from "@prisma/client";

import ImageForm from "./image-form";
import TitleForm from "./title-form";
import PriceForm from "./price-form";
import CategoryForm from "./category-form";
import ChaptersForm from "./chapters-form";
import AttachmentForm from "./attachment-form";
import DescriptionForm from "./description-form";
import { IconBadge } from "@/components/icon-badge";

import { getAllCategories } from "@/lib/actions/get-all-categories";

const CourseFormsList = async ({ course }: { course: Course }) => {
  //get all categories
  const categories = await getAllCategories();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={LayoutDashboard} />
          <h2 className="text-xl">Customize your course</h2>
        </div>

        <TitleForm initialData={course} courseId={course.id} />

        <DescriptionForm initialData={course} courseId={course.id} />

        <ImageForm initialData={course} courseId={course.id} />

        <CategoryForm
          initialData={course}
          courseId={course.id}
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-x-2">
          <IconBadge icon={ListChecks} />
          <h2 className="text-xl">Course chapters</h2>
        </div>
        <ChaptersForm initialData={course} courseId={course.id} />

        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={CircleDollarSign} />
            <h2 className="text-xl">Sell your course</h2>
          </div>
          <PriceForm initialData={course} courseId={course.id} />
        </div>

        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={File} />
            <h2 className="text-xl">Resources & Attachments</h2>
          </div>
          <AttachmentForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseFormsList;

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";

import { CategoryFormProps, CategoryInputValues } from "@/types/form.types";

import { Button } from "@/components/ui/button";
import CategoryInputForm from "@/components/forms/category-input";

const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  // Toggle edit mode
  const toggleEdit = () => setIsEditing((prev) => !prev);

  // Find selected option label
  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );

  // Handle form submission
  const onSubmit = async (values: CategoryInputValues) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Success", { description: "Course successfully updated" });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Error", { description: "Something went wrong" });
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoryId && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No category"}
        </p>
      )}

      {isEditing && (
        <CategoryInputForm
          initialData={initialData}
          onSubmit={onSubmit}
          options={options}
        />
      )}
    </div>
  );
};

export default CategoryForm;

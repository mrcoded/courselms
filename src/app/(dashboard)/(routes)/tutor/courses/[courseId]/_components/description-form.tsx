"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import DescriptionInputForm from "@/components/forms/description-input";

import {
  DescriptionFormProps,
  DescriptionInputValues,
} from "@/types/form.types";

const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // Toggle edit mode
  const toggleEdit = () => setIsEditing((prev) => !prev);

  // Handle form submission
  const onSubmit = async (values: DescriptionInputValues) => {
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
        Course Descrption
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit descrption
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2 text-wrap break-words",
            !initialData.description && "text-slate-500 italic",
          )}
        >
          {initialData.description || "No description"}
        </p>
      )}

      {isEditing && (
        <DescriptionInputForm
          isEditing={isEditing}
          onSubmit={onSubmit}
          initialData={initialData}
        />
      )}
    </div>
  );
};

export default DescriptionForm;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import DescriptionInputForm from "@/components/forms/description-input";

import {
  DescriptionFormProps,
  DescriptionInputValues,
} from "@/types/form.types";

const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
}: DescriptionFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // Toggle edit mode
  const toggleEdit = () => setIsEditing((prev) => !prev);

  // Handle form submission
  const onSubmit = async (values: DescriptionInputValues) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Success", { description: "Chapter Description updated" });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Error", { description: "Something went wrong" });
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Descrption
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
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {!initialData.description && "No description"}
          {initialData.description && (
            <Preview value={initialData.description} />
          )}
        </div>
      )}

      {isEditing && (
        <DescriptionInputForm
          onSubmit={onSubmit}
          isEditing={isEditing}
          initialData={initialData}
        />
      )}
    </div>
  );
};

export default ChapterDescriptionForm;

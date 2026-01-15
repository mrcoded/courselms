"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

import { TitleFormProps, TitleInputValues } from "@/types/form.types";

import { Button } from "@/components/ui/button";
import TitleInputForm from "@/components/forms/title-input-form";

const ChapterTitleForm = ({
  initialData,
  courseId,
  chapterId,
}: TitleFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  // Toggle edit mode
  const toggleEdit = () => setIsEditing((prev) => !prev);

  // Handle form submission
  const onSubmit = async (values: TitleInputValues) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Success", { description: "Chapter Title updated" });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Error", { description: "Something went wrong" });
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData?.title}</p>}

      {isEditing && (
        <TitleInputForm
          onSubmit={onSubmit}
          isEditing={isEditing}
          initialData={initialData}
        />
      )}
    </div>
  );
};

export default ChapterTitleForm;

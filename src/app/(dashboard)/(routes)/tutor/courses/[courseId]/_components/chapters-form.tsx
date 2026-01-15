"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2, PlusCircle } from "lucide-react";

import axios from "axios";
import { toast } from "sonner";

import { ChaptersList } from "./chapters-list";
import { Button } from "@/components/ui/button";
import ChapterInputForm from "@/components/forms/chapter-input";

import { useUpdatingStore } from "@/store/useUpdatingStore";
import { ChaptersFormProps, TitleInputValues } from "@/types/form.types";

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState(false);

  // Handle chapter reorder boolean state
  const isUpdating = useUpdatingStore((state) => state.isUpdating);

  // Toggle create mode
  const toggleCreating = () => setIsCreating((prev) => !prev);

  // Handle edit chapter
  const onEdit = (id: string) => {
    router.push(`/tutor/courses/${courseId}/chapters/${id}`);
  };

  // Handle form submission
  const onSubmit = async (values: TitleInputValues) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Success", { description: "Chapter successfully created" });
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Error", { description: "Something went wrong" });
    }
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapter
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <ChapterInputForm courseId={courseId} onSubmit={onSubmit} />
      )}
      {!isCreating && (
        <>
          <div
            className={cn(
              "text-sm mt-2",
              !initialData?.chapters?.length && "text-slate-500 italic"
            )}
          >
            {!initialData?.chapters?.length && "No chapters"}
            <ChaptersList
              onEdit={onEdit}
              courseId={courseId}
              items={initialData?.chapters || []}
            />
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to re-order the chapters
          </p>
        </>
      )}
    </div>
  );
};

export default ChaptersForm;

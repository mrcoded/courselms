"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { File, Loader2, PlusCircle, X } from "lucide-react";

import axios from "axios";
import { toast } from "sonner";

import { useGetIdStore } from "@/store/useIdStore";

import { AttachmentFormProps, AttachmentInputValues } from "@/types/form.types";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useDeleteActions } from "@/hooks/use-delete-actions";

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const router = useRouter();

  // Get attachment id
  const getId = useGetIdStore((state) => state.getId);

  // Delete attachment handler
  const { mutate: onAttachmentDelete } = useDeleteActions(
    courseId,
    getId ?? ""
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Toggle edit mode
  const toggleEdit = () => setIsEditing((prev) => !prev);

  // Handle form submission
  const onSubmit = async (values: AttachmentInputValues) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Success", { description: "Course attachment added" });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Error", { description: "Something went wrong" });
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData?.attachments?.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData?.attachments && initialData?.attachments?.length > 0 && (
            <div className="space-y-2">
              {initialData?.attachments?.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {getId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}

                  {getId !== attachment.id && (
                    <button
                      onClick={() => onAttachmentDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4 " />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onchange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;

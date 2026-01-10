"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";

import { formatPrice } from "@/lib/formatPrice";
import { PriceFormProps, PriceInputValues } from "@/types/input.types";

import { Button } from "@/components/ui/button";
import PriceInputForm from "@/components/forms/price-input";

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  // Toggle edit mode
  const toggleEdit = () => setIsEditing((prev) => !prev);

  // Handle form submission
  const onSubmit = async (values: PriceInputValues) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Success", { description: "Course price updated" });
      toggleEdit();
      router.refresh();
    } catch {
      toast.success("Error", {
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course price
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.price && "text-slate-500 italic"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "No price"}
        </p>
      )}

      {isEditing && (
        <PriceInputForm initialData={initialData} onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default PriceForm;

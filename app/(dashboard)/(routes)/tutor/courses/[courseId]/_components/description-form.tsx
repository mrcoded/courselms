"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const router = useRouter();

  const formSchema = z.object({
    description: z.string().min(1, {
      message: "description is required",
    }),
  });

  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = formMethods.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({ title: "Success", description: "Course successfully updated" });
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong" });
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
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {initialData.description || "No description"}
        </p>
      )}

      {isEditing && (
        <Form {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={formMethods.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g 'This course is about...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="flex items-center gap-x-2">
                    <Button type="submit" disabled={!isValid || isSubmitting}>
                      Save
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
};

export default DescriptionForm;

import React from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormDescription,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { titleInputSchema } from "@/validators/input-field";
import { TitleFormProps, TitleInputValues } from "@/types/input.types";

const TitleInputForm = ({
  onSubmit,
  isEditing,
  initialData,
}: TitleFormProps) => {
  const router = useRouter();

  // Initialize form methods
  const formMethods = useForm<TitleInputValues>({
    resolver: zodResolver(titleInputSchema),
    defaultValues: initialData,
  });

  // Destructure form state
  const { isSubmitting, isValid } = formMethods.formState;

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className={isEditing ? "space-y-4 mt-4" : "space-y-8"}
      >
        <FormField
          control={formMethods.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              {!isEditing && <FormLabel>Course title</FormLabel>}
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="e.g 'Advanced web development'"
                  {...field}
                />
              </FormControl>
              {!isEditing && (
                <FormDescription>
                  What will you teach in this course?
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-2">
          {!isEditing && (
            <Button type="button" variant="ghost" onClick={() => router.back()}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isEditing ? "Save changes" : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TitleInputForm;

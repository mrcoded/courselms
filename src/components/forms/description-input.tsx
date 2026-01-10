import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DescriptionFormProps } from "@/types/input.types";
import { descriptionInputSchema } from "@/validators/input-field";

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const DescriptionInputForm = ({
  onSubmit,
  isEditing,
  initialData,
}: DescriptionFormProps) => {
  // Initialize form methods
  const formMethods = useForm<z.infer<typeof descriptionInputSchema>>({
    resolver: zodResolver(descriptionInputSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  // Destructure form state
  const { isSubmitting, isValid } = formMethods.formState;

  return (
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
                {isEditing ? (
                  <Editor {...field} />
                ) : (
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="e.g 'This course is about...'"
                    {...field}
                  />
                )}
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
  );
};

export default DescriptionInputForm;

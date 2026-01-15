import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { titleInputSchema } from "@/validators/form-input-field";
import { ChaptersFormProps, TitleInputValues } from "@/types/form.types";

const ChapterInputForm = ({ onSubmit }: ChaptersFormProps) => {
  // Initialize form methods
  const formMethods = useForm<TitleInputValues>({
    resolver: zodResolver(titleInputSchema),
    defaultValues: {
      title: "",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="e.g 'Introduction to the course'"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Create
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChapterInputForm;

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  AccessSelectValues,
  ChapterInputAccessFormProps,
} from "@/types/form.types";
import { accessSelectSchema } from "@/validators/form-input-field";

const AccessSelectForm = ({
  onSubmit,
  initialData,
}: ChapterInputAccessFormProps) => {
  // Initialize form methods
  const formMethods = useForm<AccessSelectValues>({
    resolver: zodResolver(accessSelectSchema),
    defaultValues: {
      isFree: !!initialData.isFree,
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
          name="isFree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormDescription>
                  Check this box if you want to make this chapter free for
                  preview
                </FormDescription>
              </div>
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

export default AccessSelectForm;

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
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";

import { categoryInputSchema } from "@/validators/form-input-field";
import {
  CategoryInputFormProps,
  CategoryInputValues,
} from "@/types/form.types";

const CategoryInputForm = ({
  options,
  onSubmit,
  initialData,
}: CategoryInputFormProps) => {
  // Initialize form methods
  const formMethods = useForm<CategoryInputValues>({
    resolver: zodResolver(categoryInputSchema),
    defaultValues: { categoryId: initialData?.categoryId || "" },
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
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Combobox options={[...options]} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-2">
          <Button disabled={!isValid || isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryInputForm;

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

import { priceInputSchema } from "@/validators/form-input-field";
import { PriceFormProps, PriceInputValues } from "@/types/form.types";

const PriceInputForm = ({ initialData, onSubmit }: PriceFormProps) => {
  // Initialize form methods
  const formMethods = useForm<PriceInputValues>({
    resolver: zodResolver(priceInputSchema),
    defaultValues: {
      price: initialData.price,
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  disabled={isSubmitting}
                  placeholder="Set the course price"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-2">
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PriceInputForm;

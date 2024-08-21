"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormDescription,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const CreateCoursePage = () => {
  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(1, {
      message: "title is required",
    }),
  });

  const formMethods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting, isValid } = formMethods.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/tutor/courses/${response.data.id}`);
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Course name</h1>
        <p className="text-sm text-slate-600">
          What would you you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={formMethods.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCoursePage;

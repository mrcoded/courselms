"use client";

import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";

import TitleInputForm from "@/components/forms/title-input-form";

import { TitleInputValues } from "@/types/form.types";

const CreateCoursePage = () => {
  const router = useRouter();

  // Handle form submission
  const onSubmit = async (values: TitleInputValues) => {
    try {
      const response = await axios.post("/api/courses", values);
      toast.success("Success", {
        description: "Course successfully created",
      });
      router.push(`/tutor/courses/${response.data.id}`);
    } catch {
      toast.error("Error", { description: "Something went wrong" });
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
        {/* Title Form */}
        <TitleInputForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CreateCoursePage;

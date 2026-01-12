import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { useUpdatingStore } from "@/store/useUpdatingStore";

const useChapterReorder = (courseId: string) => {
  const router = useRouter();

  // Update state
  const setIsUpdating = useUpdatingStore((state) => state.setIsUpdating);

  const { mutate: onReorder, isPending: isUpdating } = useMutation({
    mutationFn: async (updateData: { id: string; position: number }[]) =>
      await axios.put(`/api/courses/${courseId}/chapters/reorders`, {
        list: updateData,
      }),
    onMutate: () => {
      setIsUpdating(isUpdating);
    },
    onSuccess: (data) => {
      setIsUpdating(false);
      if (data?.data === "success") {
        toast.success("Success", {
          description: "Chapters re-ordered successfully",
        });
        router.refresh();
      }
    },
    onError: (data) => {
      setIsUpdating(false);
      toast.error("Something went wrong", { description: `${data.message}` });
    },
  });

  return { onReorder };
};

export default useChapterReorder;

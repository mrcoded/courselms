import z from "zod";
import {
  accessSelectSchema,
  attachmentInputSchema,
  categoryInputSchema,
  descriptionInputSchema,
  priceInputSchema,
  titleInputSchema,
  videoInputSchema,
} from "@/validators/form-input-field";
import type { Attachment, Chapter, Course, MuxData } from "@prisma/client";

export type TitleInputValues = z.infer<typeof titleInputSchema>;
export type CategoryInputValues = z.infer<typeof categoryInputSchema>;
export type DescriptionInputValues = z.infer<typeof descriptionInputSchema>;
export type PriceInputValues = z.infer<typeof priceInputSchema>;
export type AccessSelectValues = z.infer<typeof accessSelectSchema>;
export type AttachmentInputValues = z.infer<typeof attachmentInputSchema>;
export type VideoInputValues = z.infer<typeof videoInputSchema>;

export interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId?: string;
}

export interface TitleInputFormProps {
  initialData?: {
    title: string;
  };
  isEditing?: boolean;
  onSubmit: (data: TitleInputValues) => void;
}

export interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

export interface CategoryInputFormProps {
  initialData: Course;
  onSubmit: (data: CategoryInputValues) => void;
  options: { label: string; value: string }[];
}

export interface ChaptersFormProps {
  initialData: Course & { chapters?: Chapter[] | null };
  courseId: string;
}

export interface ChaptersInputFormProps {
  onSubmit: (data: TitleInputValues) => void;
}

export interface DescriptionFormProps {
  courseId: string;
  chapterId?: string;
  initialData: Course | Chapter;
}

export interface DescriptionInputFormProps {
  initialData: Course | Chapter;
  isEditing: boolean;
  onSubmit: (data: DescriptionInputValues) => Promise<void>;
}

export interface PriceFormProps {
  courseId: string;
  initialData: Course;
}

export interface PriceInputFormProps {
  initialData: Course;
  onSubmit: (data: PriceInputValues) => void;
}

export interface ChaptersListProps {
  onEdit: (id: string) => void;
  courseId: string;
  items: Chapter[];
}

export interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

export interface CourseActionsProps {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
}

export interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

export interface ChapterInputAccessFormProps {
  initialData: Chapter;
  onSubmit: (data: AccessSelectValues) => void;
}

export interface ChapterActionsProps {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
  chapterId: string;
}

export interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

export interface AttachmentFormProps {
  initialData: Course & { attachments?: Attachment[] | null };
  courseId: string;
}

import {
  RegisterAuthSchema,
  LoginAuthSchema,
} from "@/validators/auth-validator";

// Define props with generic typing for reusability with React Hook Form
export interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
}

// TypeScript type derived from the Zod schema
export type RegisterAuthFormValues = z.infer<typeof RegisterAuthSchema>;
export type LoginAuthFormValues = z.infer<typeof LoginAuthSchema>;

// Server Action Response Type
export type ActionResponse = {
  success: boolean;
  message: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

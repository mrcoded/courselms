"use client";

import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { LoginAuthFormValues, RegisterAuthFormValues } from "@/types/auth";

import { authClient } from "@/config/auth-client";
import { loginUserFn, registerUserFn } from "@/lib/actions/auth.actions";

export function RegisterService() {
  const router = useRouter();

  //RegisterUser function handler
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: async (data: RegisterAuthFormValues) =>
      await registerUserFn(data),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Success", { description: `${data.message}` });

        //redirect to login
        setTimeout(() => router.push("/auth/login"), 3000);
      } else {
        toast.error("Error", { description: `${data.message}` });
      }
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientKnownRequestError
          ? "Internal Server Error"
          : error?.message;

      toast.error("Something went wrong", { description: errorMessage });
    },
  });

  return { registerUser, isPending };
}

export function LoginService() {
  const router = useRouter();

  //login mutation handler
  const { mutateAsync: loginUser, isPending } = useMutation({
    mutationFn: async (data: LoginAuthFormValues) => await loginUserFn(data),
    onSuccess: (data) => {
      if (data?.user) {
        toast.success("Success", {
          description: "Login Successful! Redirecting...",
        });

        router.push("/");
      } else throw Error;
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Prisma.PrismaClientInitializationError ||
        error instanceof Prisma.PrismaClientKnownRequestError
          ? "Internal Server Error"
          : error?.message;

      toast.error("Something went wrong", { description: errorMessage });
    },
  });

  return {
    loginUser,
    isPending,
  };
}

export function LogoutService() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Success", {
            description: "Logged out Successful! Redirecting...",
          });

          router.push("/auth/login");
        },
      },
    });
  };
  return { handleLogout };
}

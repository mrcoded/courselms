"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

import { authClient } from "@/config/auth-client";
import { loginUserFn, registerUserFn } from "@/lib/actions/auth.actions";

export function RegisterService() {
  const router = useRouter();
  const { toast } = useToast();

  //RegisterUser function handler
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: registerUserFn,
    onSuccess: (data) => {
      if (data?.success) {
        toast({
          title: "Success",
          description: `${data.message}`,
          variant: "default",
        });

        //redirect to login
        router.push("/auth/login");
      }
    },
    onError: (data) => {
      toast({
        title: "Something went wrong",
        description: `${data.message}`,
        variant: "destructive",
      });
    },
  });

  return { registerUser, isPending };
}

export function LoginService() {
  const router = useRouter();
  const { toast } = useToast();

  //login mutation handler
  return useMutation({
    mutationFn: loginUserFn,
    onSuccess: (data) => {
      console.log(data);
      if (data?.user) {
        toast({
          title: "Success",
          description: "Login Successful! Redirecting...",
          variant: "default",
        });

        router.push("/");
      } else {
        throw Error;
      }
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: `${
          error.message.includes("Prisma")
            ? "Internal Server Error"
            : error.message
        }`,
        variant: "destructive",
      });
    },
  });
}

export function LogoutService() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Logged out Successful! Redirecting...",
          });

          router.push("/auth/login");
        },
      },
    });
  };
  return { handleLogout };
}

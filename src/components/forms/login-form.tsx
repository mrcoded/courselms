"use client";

import React, { useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginService } from "@/services/auth.service";

import { LoginAuthFormValues } from "@/types/auth";
import { LoginAuthSchema } from "@/validators/auth-validator";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthButton from "@/components/ui/Button/AuthButton";
import PasswordVisibility from "@/components/password-visibility";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //LoginUser service function handler
  const { loginUser, isPending } = LoginService();

  // Initialize validation
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
      errors: { email, password },
    },
  } = useForm<LoginAuthFormValues>({
    resolver: zodResolver(LoginAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //onSubmit handler
  const onSubmit = async (data: LoginAuthFormValues) => {
    await loginUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm mx-auto space-y-4"
    >
      <p className="text-xs sm:text-sm mb-2">
        Login with your credentials below.
      </p>
      <fieldset
        disabled={isSubmitting}
        className="grid w-full items-center gap-4"
      >
        <div className="grid w-full items-center gap-4">
          {/* Input Error messages */}
          <>
            {email && <p className="text-xs text-red-500">{email.message}</p>}

            {password && (
              <p className="text-xs text-red-500">{password.message}</p>
            )}
          </>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="e.g. yourname@example.com"
              required
            />
          </div>
          <div className="relative flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              required
            />
            <PasswordVisibility
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <AuthButton
            isPending={isPending}
            btnPending="Logging in..."
            btnLabel="Login"
          />
        </div>
        <p className="text-xs">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="hover:underline font-medium text-sm"
          >
            Sign up
          </Link>
        </p>
      </fieldset>
    </form>
  );
};

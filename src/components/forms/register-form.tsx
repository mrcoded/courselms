"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterService } from "@/services/auth.service";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthButton from "@/components/ui/Button/AuthButton";
import PasswordVisibility from "@/components/password-visibility";

import { RegisterAuthFormValues } from "@/types/auth";
import { RegisterAuthSchema } from "@/validators/auth-validator";

import { UserTypeSelector } from "@/app/auth/_components/select-user-type";

export const RegisterForm = () => {
  const [role, setRole] = useState("");

  const [isRoleSelect, setIsRoleSelect] = useState(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  //RegisterUser service function handler
  const { registerUser, isPending } = RegisterService();

  //Form validation
  const {
    control,
    register,
    handleSubmit,
    formState: {
      isSubmitting,
      errors: { email, password },
    },
    reset,
  } = useForm<RegisterAuthFormValues>({
    resolver: zodResolver(RegisterAuthSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: role,
    },
  });

  //onSubmit handler
  const onSubmit = async (data: RegisterAuthFormValues) => {
    registerUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm mx-auto space-y-4"
    >
      <p className="text-sm mb-2">Sign up with your information below.</p>
      {!isRoleSelect ? (
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <UserTypeSelector
              setRole={(val) => {
                field.onChange(val);
                setIsRoleSelect(true);
              }}
              role={field.value}
              setIsRoleSelect={setIsRoleSelect}
            />
          )}
        />
      ) : (
        <fieldset
          disabled={isSubmitting}
          className="grid w-full items-center gap-4"
        >
          {/*Input Error messages */}
          <>
            {email && <p className="text-xs text-red-500">{email.message}</p>}

            {password && (
              <p className="text-xs text-red-500">{password.message}</p>
            )}
          </>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Full name</Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              placeholder="John Doe"
              required
            />
          </div>
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

          <AuthButton
            isPending={isPending}
            btnPending="Signing up..."
            btnLabel="Sign Up"
          />

          <p className="text-xs">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="hover:underline font-medium text-sm"
            >
              Login
            </Link>
          </p>
        </fieldset>
      )}
    </form>
  );
};

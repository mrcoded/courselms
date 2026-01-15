"use server";

import { db } from "@/config/db";
import { auth } from "@/config/auth";

import { LoginAuthFormValues, RegisterAuthFormValues } from "@/types/auth";

export async function registerUserFn(
  formData: RegisterAuthFormValues
): Promise<RegisterAuthFormValues> {
  //destructure data
  const { email, password, name, role } = formData;

  try {
    //register user with betterAuth
    await auth.api.signUpEmail({
      body: {
        email,
        name,
        role,
        password,
      },
      asResponse: true,
    });

    //check if user already exists in the db
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        message: "User Already exists!",
        success: false,
      };
    }

    //Create new user tot the db
    await db.user.create({
      data: {
        name,
        email,
        role,
      },
    });

    return {
      success: true,
      message: `Registration successful, redirecting to Login...`,
    };
  } catch (error) {
    console.log("Registration Error:", error);
    throw new Error("Registration failed. Please try again.");
  }
}

export const loginUserFn = async (formData: LoginAuthFormValues) => {
  const { email, password } = formData;

  return await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
};

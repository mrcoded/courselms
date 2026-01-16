"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { GraduationCap, Presentation } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const UserTypeSelector = ({
  role,
  setRole,
  setIsRoleSelect,
}: {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setIsRoleSelect: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // handle click handler
  const handleClick = () => {
    setIsRoleSelect(true);
  };

  return (
    <Card className="w-full max-w-[500px] mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Select User Type</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Please confirm how you want to continue as a member.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={role}
          onValueChange={(value) => setRole(value)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Student Option */}
          <div>
            <RadioGroupItem
              value="student"
              id="student"
              className="peer sr-only"
            />
            <Label
              htmlFor="student"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-sky-600 [&:has([data-state=checked])]:border-sky-600 cursor-pointer transition-all"
            >
              <GraduationCap className="mb-3 h-6 w-6" />
              <span className="font-semibold">Student</span>
            </Label>
          </div>

          {/* Tutor Option */}
          <div>
            <RadioGroupItem value="tutor" id="tutor" className="peer sr-only" />
            <Label
              htmlFor="tutor"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-sky-600 [&:has([data-state=checked])]:border-sky-600 cursor-pointer transition-all"
            >
              <Presentation className="mb-3 h-6 w-6" />
              <span className="font-semibold">Tutor</span>
            </Label>
          </div>
        </RadioGroup>

        <p className="mt-4 text-xs text-center text-muted-foreground">
          You are continuing as:{" "}
          <span className="font-bold text-primary capitalize">{role}</span>
        </p>

        <Button
          variant="ghost"
          onClick={handleClick}
          className="flex underline place-self-center font-semibold"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};

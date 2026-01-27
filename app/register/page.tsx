"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/ui/form-input";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

    cpassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.cpassword, {
    path: ["cpassword"],
    message: "Passwords do not match",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Form data:", data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-lg bg-yellow-300 p-8 shadow-md">

        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">
          Register
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          <div>
            <FormInput
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              error={errors.email}
            />
          </div>

          <div>            
            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password}
            />
          </div>

          <div>
            <FormInput
              label="Confirm Password"
              type="cpassword"
              placeholder="••••••••"
              {...register("cpassword")}
              error={errors.cpassword}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

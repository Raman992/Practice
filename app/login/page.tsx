"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/store/services/authAPI";
import { loginSuccess } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import z from "zod";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/ui/form-input";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const result = await login({
        Username: formData.email,
        Password: formData.password,
      }).unwrap();

      console.log("Login success:", result);

      dispatch(loginSuccess({
        token: result.token,
        user: result.user
      }));

      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-lgbg-gray-900 p-8 shadow-md bg-yellow-300 rounded-2xl">
        <h1 className="mb-6 text-center text-2xl font-semibold text-white">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormInput
              label="Email"
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

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {error && (
            <p className="text-red-600 text-sm mt-2 text-center">
              Login failed. Please check your credentials.
            </p>
          )}
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
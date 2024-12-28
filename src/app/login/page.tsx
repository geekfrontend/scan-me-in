"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import Loading from "@/common/components/Loading";

import useAuth from "@/hooks/useAuth";

import { auth } from "@/configs/firebase";
import { generateFirebaseAuthErrorMessage } from "@/utils/handlerErrorAuth";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const { user, loading, setLoading } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      if (userCredential.user) {
        router.push("/");
      }
      toast.success("Login successfully");
      console.log("User logged in:", userCredential.user);
      setLoading(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(generateFirebaseAuthErrorMessage(error));
      }

      console.error(error);
      setLoading(false);
    }
  };

  if (user) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white">
      <div className="mt-7 w-full max-w-md bg-white dark:bg-neutral-900 ">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Login
            </h1>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="relative flex items-center justify-center w-full px-5 py-2.5 mt-4 mb-2 text-sm font-medium text-white transition-all duration-200 bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                aria-busy={loading ? "true" : "false"}
                aria-live="polite"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <Loading />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

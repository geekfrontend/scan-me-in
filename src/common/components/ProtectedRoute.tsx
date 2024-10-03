"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";

import Loading from "./Loading";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

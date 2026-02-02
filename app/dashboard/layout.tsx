"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!isAuthenticated) {
      const savedAuth =
        typeof window !== "undefined" && localStorage.getItem("auth");

      if (!savedAuth) {
        router.replace("/login");
      }
      else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return (
      <div className="p-6 text-white flex justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}

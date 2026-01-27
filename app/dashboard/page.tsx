"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetPostsQuery } from "@/store/services/placeholderAPI";
export default function DashboardPage() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { data, isLoading } = useGetPostsQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      {isLoading && <p>Loading...</p>}

      {data?.map((post) => (
        <div key={post.id} className="mb-3 border p-3 rounded">
          <h2 className="font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.body}</p>
        </div>
      ))}
    </div>
  );
}

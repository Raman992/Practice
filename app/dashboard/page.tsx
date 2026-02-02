"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useGetPostsQuery } from "@/store/services/placeholderAPI";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Post = {
  id: number;
  name: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Add mounted state
  const [mounted, setMounted] = useState(false);

  const { data = [], isLoading, error } = useGetPostsQuery(undefined, {
    skip: !isAuthenticated || !mounted, // Don't fetch until mounted
  });

  useEffect(() => {
    setMounted(true);

    // Check authentication only after mounting
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        const savedAuth = localStorage.getItem('auth');
        if (!savedAuth) {
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      const isUnauthorized =
        ('status' in error && error.status === 401) ||
        ('originalStatus' in error && error.originalStatus === 401) ||
        (error && typeof error === 'object' && 'data' in error &&
          (error.data as any)?.statusCode === 401);

      if (isUnauthorized) {
        console.log("Token expired or invalid, logging out...");
        dispatch(logout());
        router.push("/login");
      }
    }
  }, [error, dispatch, router]);

  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Link
            href={`/dashboard/users/${row.original.id}`}
          >
            View User
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="p-6 text-white">
        <Spinner />
      </div>
    );
  }

  // Check auth after mount
  if (!isAuthenticated) {
    return (
      <div className="p-6 text-white">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400"><Spinner />Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <Button disabled size="sm">
            <Spinner data-icon="inline-start" />
            Loading Posts...
          </Button>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-4">
          <p className="text-red-300">Error loading posts: {(error as any)?.data?.message || 'Unknown error'}</p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="mb-4 text-sm text-gray-400">
            Showing {data.length} posts
          </div>
          <div className="overflow-x-auto border rounded-lg border-gray-700">
            <table className="w-full border-collapse">
              <thead className="bg-gray-800">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="border border-gray-700 p-3 text-left font-medium"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border border-gray-700 p-3 text-sm text-gray-300"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
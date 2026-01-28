"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useGetPostsQuery } from "@/store/services/placeholderAPI";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const token = useSelector((state: RootState) => state.auth.token);

  const { data = [], isLoading, error } = useGetPostsQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        const savedAuth = localStorage.getItem('auth');
        if (!savedAuth) {
          router.push("/login");
        } else {
          console.log("User has saved auth, but Redux state not updated yet");
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
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "body",
        header: "Body",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!isAuthenticated) {
    return (
      <div className="p-6 text-white">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <div className="text-sm text-gray-400">
          Welcome! Token: {token ? `${token.substring(0, 10)}...` : 'No token'}
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <p className="text-lg">Loading posts...</p>
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
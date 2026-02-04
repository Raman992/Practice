"use client";

import { useMemo } from "react";
import { useGetPostsQuery } from "@/store/services/placeholderAPI";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PostsResponse = {
  users: Post[];
  total: number;
};

type Post = {
  id: number;
  name: string;
  email: string;
};

export default function DashboardPage() {
  const { data, isLoading, error } = useGetPostsQuery();
  const posts = data?.users ?? [];


  const columns = useMemo<ColumnDef<PostsResponse, void>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
        filterFn: "includesString",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "id",
        id: "actions",
        header: "Actions",
        cell: ({ getValue }) => (
          <Link
            href={`/dashboard/users/${getValue()}`}
            className="text-blue-400 hover:underline"
          >
            View User
          </Link>
        ),
      }
    ],
    []
  );

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      }
    }
  });

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <Spinner />
          <Button disabled size="sm" className="mt-4">
            Loading Posts...
          </Button>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-4">
          <p className="text-red-300">
            Error loading posts:{" "}
            {(error as any)?.data?.message || "Unknown error"}
          </p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="mb-4 text-sm text-gray-400">
            Showing {table.getFilteredRowModel().rows.length} posts
          </div>

          <input
            placeholder="Search name..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(e) => {
              table.getColumn("name")?.setFilterValue(e.target.value);
              table.setPageIndex(0);
            }}

            className="border p-2 mb-3"
          />

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
            <div className="flex items-center justify-between m-4 px-2">
              <span className="text-sm text-gray-400">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>

              <div className="space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {">"}
                </Button>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

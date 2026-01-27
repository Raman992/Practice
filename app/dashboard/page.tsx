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

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const { data = [], isLoading } = useGetPostsQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

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

  if (!isAuthenticated) return null;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      {isLoading && <p>Loading...</p>}

      {!isLoading && (
        <div className="overflow-x-auto border rounded">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border p-3 text-left"
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border p-3 text-sm text-gray-300"
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
      )}
    </div>
  );
}

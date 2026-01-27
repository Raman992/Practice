import { ColumnDef } from "@tanstack/react-table";

type JsonData = {
  id: number
  title: string
  body: string
}

export const columns: ColumnDef<JsonData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "body",
    header: "Body",
  },
];
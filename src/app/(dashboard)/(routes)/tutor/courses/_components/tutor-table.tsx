"use client";

import * as React from "react";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import DataTable from "@/tables/data-table";
import { DataTableProps } from "@/tables/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TutorTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter courses..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-xs sm:text-sm"
        />

        <Button
          className="text-xs sm:text-sm ml-auto"
          onClick={() => router.push("/tutor/create")}
        >
          <PlusCircle className="h-4 w-4 sm:mr-2" />
          New Course
        </Button>
      </div>

      <div className="rounded-md border">
        <DataTable table={table} columns={columns} />
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

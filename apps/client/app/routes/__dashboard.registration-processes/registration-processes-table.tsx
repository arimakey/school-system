import { AppTable } from "~/components/app-table";
import { useRegistrationProcesses } from "~/context/registration_process-context";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { RegistrationProcess } from "~/interfaces/registration-processes.interface";

export default function RegistrationProcessTable() {
  const { processes, toggleEditDialog, toggleEnableDialog, toggleDetailDialog } = useRegistrationProcesses();

  const columns: ColumnDef<RegistrationProcess>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <span>{row.getValue("name")}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <span>{row.getValue("description") || "N/A"}</span>,
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span>{new Date(row.getValue("startDate")).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span>{new Date(row.getValue("endDate")).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        const isActive = row.getValue("status");
        return (
          <span className="flex items-center">
            <span
              className={`h-3 w-3 rounded-full mr-2 ${
                isActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const process = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  const id = process._id;
                  toggleDetailDialog(id);
                }}
              >
                Ver detalle
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const id = process._id;
                  toggleEditDialog(id);
                }}
              >
                Edit Process
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  const id = process._id;
                  toggleEnableDialog(id);
                }}
              >
                Cambiar Estado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <AppTable columns={columns} data={processes} enableRowSelection />;
}

import { ColumnDef } from "@tanstack/react-table";
import { Student } from "~/routes/__dashboard.students/students-types";
import { Button } from '~/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "code",
        header: "Code",
        enableSorting: true,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Nombre
                <ArrowUpDown />
              </Button>
            )
        },
        cell: ({ row }) => `${row.original.name} ${row.original.last_name}`,
        enableSorting: true,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Email
                <ArrowUpDown />
              </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
        enableSorting: true,
    },
    {
        accessorKey: "dni",
        header: "DNI",
        enableSorting: true,
    },
    {
        accessorKey: "address",
        header: "Address",
        enableSorting: true,
        cell: (info) => info.getValue() || "N/A",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        enableSorting: true,
        cell: (info) => info.getValue() || "N/A",
    },
    {
        accessorKey: "nationality",
        header: "Nationality",
        enableSorting: true,
        cell: (info) => info.getValue() || "N/A",
    },
    {
        accessorKey: "gender",
        header: "Gender",
        enableSorting: true,
        cell: (info) => {
            const gender = info.getValue();
            return gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "N/A";
        },
    },
    {
        accessorKey: "enrollmentDate",
        header: "Enrollment Date",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
        enableSorting: true,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const student = row.original
     
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
                    onClick={() => navigator.clipboard.writeText(student.code)}
                    >
                    Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View customer</DropdownMenuItem>
                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];

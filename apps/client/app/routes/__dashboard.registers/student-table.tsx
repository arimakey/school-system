import { AppTable } from "~/components/app-table";
import { useStudents } from "~/context/students-context";
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
import { Student } from "~/interfaces/students.interface";
import toast from "react-hot-toast";

export default function StudentTable() {
  const { students, toggleDeleteDialog } = useStudents();

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <span>{row.getValue("code")}</span>,
      enableSorting: true,
    },
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
      cell: ({ row }) => (
        <div>
          {row.original.name} {row.original.last_name}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="lowercase">{row.getValue("email")}</span>
      ),
    },
    {
      accessorKey: "dni",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DNI
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <span>{row.getValue("dni") || "N/A"}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <span>{row.getValue("address") || "N/A"}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      cell: ({ row }) => <span>{row.getValue("phoneNumber") || "N/A"}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "enrollmentDate",
      header: "Enrollment Date",
      cell: ({ row }) =>
        row.getValue("enrollmentDate")
          ? new Date(row.getValue("enrollmentDate")).toLocaleDateString()
          : "N/A",
      enableSorting: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original;

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
                Copiar Codigo de Estudiante
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                    const id = student._id;
                    toggleDeleteDialog(id);
                }}
              >
                Eliminar Estudiante
              </DropdownMenuItem>
              <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
              <DropdownMenuItem>Enviar Email</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <AppTable columns={columns} data={students} enableRowSelection />;
}

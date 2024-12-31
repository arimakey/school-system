import { AppTable } from "~/components/app-table";
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
import toast from "react-hot-toast";
import { Register } from "~/interfaces/registers.interface";
import { useRegisters } from "~/context/not-register-context";

export default function RegisterTable() {
  const {
    registers,
    toggleDeleteDialog,
    toggleDetailDialog,
    toggleApprovalDialog,
    genReport,
  } = useRegisters();

  const columns: ColumnDef<Register>[] = [
    {
      accessorKey: "student.code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <span>{row.original.student.code}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "student.name",
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
          {row.original.student.name} {row.original.student.last_name}
        </div>
      ),
    },
    {
      accessorKey: "guardian.name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Guardian Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.original.guardian.name} {row.original.guardian.last_name}
        </div>
      ),
    },
    {
      accessorKey: "guardian.email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Guardian Email
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="lowercase">{row.original.guardian.email}</span>
      ),
    },
    {
      accessorKey: "classroom.name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Classroom
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <span>{row.original.classroom.name}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "student.dni",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DNI
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <span>{row.original.student.dni || "N/A"}</span>,
      enableSorting: true,
    },
    {
      accessorKey: "guardian.phoneNumber",
      header: "Guardian Phone",
      cell: ({ row }) => (
        <span>{row.original.guardian.phoneNumber || "N/A"}</span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "student.enrollmentDate",
      header: "Enrollment Date",
      cell: ({ row }) =>
        row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleDateString()
          : "N/A",
      enableSorting: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const register = row.original;

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
                onClick={() =>
                  navigator.clipboard.writeText(register.student.code)
                }
              >
                Copiar Código de Registro
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  const id = register._id;
                  toggleApprovalDialog(id); // Abre el diálogo de aprobación
                }}
              >
                Aprobar Registro
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const id = register._id;
                  toggleDetailDialog(id);
                }}
              >
                Ver Detalles
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log(row.original);
                  genReport(row.original);
                }}
              >
                Crear reporte
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <AppTable columns={columns} data={registers} enableRowSelection />;
}

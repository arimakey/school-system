import { AppTable } from "~/components/app-table";
import { useUsers } from "~/context/users-context";
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
import { User } from "~/interfaces/user.interface";

export default function UserTable() {
  const { users, toggleDeleteDialog, toggleRecoverDialog } = useUsers();

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <span>{row.getValue("username")}</span>,
      enableSorting: true,
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
      accessorKey: "role",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <span>{row.getValue("role") || "N/A"}</span>,
    },
    {
      accessorKey: "image",
      header: "Profile Image",
      cell: ({ row }) =>
        row.getValue("image") ? (
          <img
            src={row.getValue("image")}
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        ) : (
          "N/A"
        ),
      enableSorting: false,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

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
                onClick={() => navigator.clipboard.writeText(user.username)}
              >
                Copiar Username
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  const id = user._id;
                  toggleDeleteDialog(id);
                }}
              >
                Eliminar Usuario
              </DropdownMenuItem>
              <DropdownMenuItem
              onClick={() =>{
                const email = user.email;
                toggleRecoverDialog(email)
              }}>
                Recuperar Contraseña
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <AppTable columns={columns} data={users} enableRowSelection />;
}

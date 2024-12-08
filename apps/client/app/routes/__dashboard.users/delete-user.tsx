import { useState } from "react";
import { AppConfirmDialog } from "~/components/app-confirm";
import { useUsers } from "~/context/users-context";
import toast from "react-hot-toast";

function DeleteUser() {
  const { isDeleteDialogOpen, toggleDeleteDialog, removeUser, selectedUserId } = useUsers();
  return (
    <AppConfirmDialog
      title="¿Estás seguro de eliminar este usuario?"
      description="Esta acción no se puede deshacer. El registro del usuario será eliminado permanentemente del sistema."
      cancelText="Cancelar"
      actionText="Eliminar"
      onCancel={() => console.log("Acción de cancelar eliminada")}
      onAction={() => {
        toast.promise(
          removeUser(selectedUserId),
          {
            loading: 'Eliminando...',
            success: <b>¡El usuario fue eliminado correctamente!</b>,
            error: (err) => `${err.toString()}`,
          }
        );
      }}
      isOpen={isDeleteDialogOpen}
      setIsOpen={toggleDeleteDialog}
    />
  );
}

export default DeleteUser;

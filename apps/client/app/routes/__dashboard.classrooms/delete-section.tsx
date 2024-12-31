import { useState } from "react";
import { AppConfirmDialog } from "~/components/app-confirm";
import toast from "react-hot-toast";
import { useClassroom } from "~/context/classrooms-context";

function DeleteSection() {
  const { deleteDialogOpen, toggleDeleteDialog, removeSection, selectedSection } = useClassroom();

  return (
    <AppConfirmDialog
      title="¿Estás seguro de eliminar esta sección?"
      description="Esta acción no se puede deshacer. El registro de la sección será eliminado permanentemente del sistema."
      cancelText="Cancelar"
      actionText="Eliminar"
      onCancel={toggleDeleteDialog}
      onAction={() => {
        if (!selectedSection) return;
        toast.promise(
          removeSection(selectedSection._id || ""),
          {
            loading: "Eliminando...",
            success: <b>¡La sección fue eliminada correctamente!</b>,
            error: (err) => `${err.toString()}`,
          }
        );
      }}
      isOpen={deleteDialogOpen}
      setIsOpen={toggleDeleteDialog}
    />
  );
}

export default DeleteSection;

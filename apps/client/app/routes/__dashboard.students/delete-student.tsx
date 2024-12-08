import { useState } from "react";
import { AppConfirmDialog } from "~/components/app-confirm";
import { useStudents } from "~/context/students-context";
import { deleteStudent } from '~/api/student';
import toast from "react-hot-toast";

function DeleteStudent() {
  const { isDeleteDialogOpen, toggleDeleteDialog, removeStudent, selectedStudentId } = useStudents()
  return (
    <AppConfirmDialog
      title="¿Estás seguro de eliminar este alumno?"
      description="Esta acción no se puede deshacer. El registro del alumno será eliminado permanentemente del sistema."
      cancelText="Cancelar"
      actionText="Eliminar"
      onCancel={() => console.log("Acción de cancelar eliminada")}
      onAction={() => {
        toast.promise(
            removeStudent(selectedStudentId),
            {
              loading: 'Saving...',
              success: <b>Se elimino correctamente!</b>,
              error: (err) => `${err.toString()}`,
            }
        );
      }}
      isOpen={isDeleteDialogOpen}
      setIsOpen={toggleDeleteDialog}
    />
  );
}

export default DeleteStudent;

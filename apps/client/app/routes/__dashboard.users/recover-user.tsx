import { useState } from "react";
import { AppConfirmDialog } from "~/components/app-confirm";
import { useUsers } from "~/context/users-context";
import toast from "react-hot-toast";

function RecoverPassword() {
  const {
    isRecoverDialogOpen,
    toggleRecoverDialog,
    selectedUserId,
    recoverUserPassword
  } = useUsers();
  return (
    <AppConfirmDialog
      title="¿Quieres enviar un enlace de recuperación de contraseña?"
      description="Se enviará un correo al usuario con un enlace para restablecer su contraseña. ¿Deseas continuar?"
      cancelText="Cancelar"
      actionText="Enviar"
      onCancel={() => console.log("Acción de cancelar recuperación activada")}
      onAction={() => {
        toast.promise(recoverUserPassword(selectedUserId), {
          loading: "Enviando correo...",
          success: <b>¡Correo de recuperación enviado correctamente!</b>,
          error: (err) => `${err.toString()}`,
        });
      }}
      isOpen={isRecoverDialogOpen}
      setIsOpen={toggleRecoverDialog}
    />
  );
}

export default RecoverPassword;

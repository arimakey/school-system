import toast from "react-hot-toast";
import { useRegistrationProcesses } from "~/context/registration_process-context";
import { AppConfirmDialog } from "~/components/app-confirm";

export function RegistrationProcessToggle() {
  const {
    isEnableDialogOpen,
    toggleEnableDialog,
    toggleStatus,
    selectedProcessId,
  } = useRegistrationProcesses();

  return (
    <AppConfirmDialog
      title="¿Estás seguro de realizar esta acción?"
      description="Esta acción es irreversible y puede tener consecuencias permanentes en el sistema."
      cancelText="Cancelar"
      actionText="Confirmar"
      onCancel={() => console.log("Acción cancelada por el usuario")}
      onAction={() => {
        toast.promise(toggleStatus(selectedProcessId), {
          loading: "Procesando...",
          success: <b>¡Acción completada exitosamente!</b>,
          error: (err) => `Error: ${err.toString()}`,
        });
      }}
      isOpen={isEnableDialogOpen}
      setIsOpen={toggleEnableDialog}
    />
  );
}

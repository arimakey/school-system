import { AppConfirmDialog } from "~/components/app-confirm";
import { useRegisters } from "~/context/not-register-context";
import toast from "react-hot-toast";

function ApprovalDialog() {
  const {
    isApprovalDialogOpen,
    toggleApprovalDialog,
    selectedRegisterId,
    approveRegister,
  } = useRegisters();

  return (
    <AppConfirmDialog
      title="¿Estás seguro de aprobar este registro?"
      description="Una vez aprobado, este registro será finalizado y no se podrá modificar. ¿Deseas continuar?"
      cancelText="Cancelar"
      actionText="Aprobar"
      onCancel={() => console.log("Aprobación cancelada")}
      onAction={() => {
        toast.promise(approveRegister(selectedRegisterId), {
          loading: "Aprobando registro...",
          success: <b>¡Registro aprobado correctamente!</b>,
          error: (err) => `${err.toString()}`,
        });
      }}
      isOpen={isApprovalDialogOpen}
      setIsOpen={toggleApprovalDialog}
    />
  );
}

export default ApprovalDialog;

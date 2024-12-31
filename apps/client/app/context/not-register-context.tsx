import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "~/context/auth.context";
import { Register } from "~/interfaces/registers.interface";
import {
  getNotRegisters,
  deleteRegister,
  updateRegister,
  getRegisterById,
  approveRegisterEndpoint
} from "~/api/registers"; 
import toast from "react-hot-toast";
import { generateRegisterPDF } from "../reports/report-register";

interface RegisterContextProps {
  registers: Register[];
  addOneRegister: (register: Register) => Promise<void>;
  updateOneRegister: (
    register: Partial<Register>,
    registerId: string
  ) => Promise<void>;
  removeRegister: (registerId: string) => Promise<void>;
  isEditDialogOpen: boolean;
  isEnableDialogOpen: boolean;
  isDetailDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  isApprovalDialogOpen: boolean;
  selectedRegisterId: string;
  toggleEditDialog: (registerId?: string) => void;
  toggleEnableDialog: (registerId?: string) => void;
  toggleDetailDialog: (registerId?: string) => void;
  toggleStatus: (registerId: string) => Promise<Register>;
  toggleDeleteDialog: (registerId?: string | undefined) => Promise<Register>;
  toggleApprovalDialog: (registerId?: string) => void;
  approveRegister: (registerId: string) => Promise<Register>;
  getOneRegister: (registerId: string) => Promise<Register>;
  setEditDialogOpen: (isOpen: boolean) => void;
  setDetailDialogOpen: (isOpen: boolean) => void;
  setDeleteDialogOpen: (isOpen: boolean) => void;
  genReport: (reg: Register) => void;
}

const RegisterContext = createContext<RegisterContextProps | undefined>(
  undefined
);

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useAuth();
  const [registers, setRegisters] = useState<Register[]>([]);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false);
  const [isEnableDialogOpen, setEnableDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isApprovalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [selectedRegisterId, setSelectedRegisterId] = useState<string>("");

  useEffect(() => {
    const fetchRegisters = async () => {
      if (!token) return;
      try {
        const fetchedRegisters = await getNotRegisters(token);
        setRegisters(fetchedRegisters);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchRegisters();
  }, [token]);

  const addOneRegister = async (register: Register) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      setRegisters((prevRegisters) => [...prevRegisters, register]);
    } catch (error) {
      console.error("Error al agregar registro:", error);
      throw error;
    }
  };

  const updateOneRegister = async (
    register: Partial<Register>,
    registerId: string
  ): Promise<void> => {
    if (!token) throw new Error("Token no encontrado");
    try {
      updateRegister(registerId, register, token).then((updatedRegister) => {
        setRegisters((prevRegisters) =>
          prevRegisters.map((r) => (r._id === registerId ? updatedRegister : r))
        );
      });
    } catch (error) {
      console.error("Error al actualizar registro:", error);
      throw error;
    }
  };

  const removeRegister = async (registerId: string) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      await deleteRegister(registerId, token);
      setRegisters((prevRegisters) =>
        prevRegisters.filter((register) => register._id !== registerId)
      );
    } catch (error) {
      console.error("Error al eliminar registro:", error);
      throw error;
    }
  };

  const toggleStatus = async (registerId: string): Promise<Register> => {
    if (!token) throw new Error("Token no encontrado");
    try {
      const updatedRegister = await getRegisterById(registerId, token);
      setRegisters((prevRegisters) =>
        prevRegisters.map((r) =>
          r._id === updatedRegister._id ? updatedRegister : r
        )
      );
      return updatedRegister;
    } catch (error) {
      console.error("Error al cambiar estado del registro:", error);
      throw error;
    }
  };

  const toggleEditDialog = (registerId?: string) => {
    setSelectedRegisterId(registerId || "");
    setEditDialogOpen((prev) => !prev);
  };

  const toggleEnableDialog = (registerId?: string) => {
    setSelectedRegisterId(registerId || "");
    setEnableDialogOpen((prev) => !prev);
  };

  const toggleDeleteDialog = async (registerId?: string): Promise<Register> => {
    setSelectedRegisterId(registerId || "");
    setDeleteDialogOpen((prev) => !prev);
    if (!registerId) throw new Error("Register ID no encontrado");
    if (!token) throw new Error("Token no encontrado");
    return await getRegisterById(registerId, token);
  };

  const toggleDetailDialog = (registerId?: string) => {
    setSelectedRegisterId(registerId || "");
    setDetailDialogOpen((prev) => !prev);
  };

  const toggleApprovalDialog = (registerId?: string) => {
    setSelectedRegisterId(registerId || "");
    setApprovalDialogOpen((prev) => !prev);
  };

  const approveRegister = async (registerId: string): Promise<Register> => {
    if (!token) throw new Error("Token no encontrado");
    if (!registerId) throw new Error("Register ID no encontrado");

    try {
      const approvedRegister = await toast.promise(
        approveRegisterEndpoint(registerId, token),
        {
          loading: "Aprobando registro...",
          success: "Registro aprobado exitosamente",
          error: "Error al aprobar el registro",
        }
      );
      setRegisters((prevRegisters) =>
        prevRegisters.filter((register) => register._id !== registerId)
      );

      return approvedRegister;
    } catch (error) {
      console.error("Error al aprobar el registro:", error);
      throw error;
    }
  };

  const getOneRegister = async (registerId: string): Promise<Register> => {
    if (!token) throw new Error("Token no encontrado");
    try {
      const register = await getRegisterById(registerId, token);
      return register;
    } catch (error) {
      console.error("Error al obtener registro:", error);
      throw error;
    }
  };

  const genReport = async (reg: Register) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      generateRegisterPDF(reg);
    } catch (error) {
      console.error("Error generando el reporte:", error);
      throw error;
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        registers,
        addOneRegister,
        updateOneRegister,
        removeRegister,
        isEditDialogOpen,
        isEnableDialogOpen,
        isDetailDialogOpen,
        isDeleteDialogOpen,
        isApprovalDialogOpen,
        selectedRegisterId,
        toggleEditDialog,
        toggleEnableDialog,
        toggleDetailDialog,
        toggleStatus,
        toggleDeleteDialog,
        toggleApprovalDialog,
        approveRegister,
        getOneRegister,
        setEditDialogOpen,
        setDetailDialogOpen,
        setDeleteDialogOpen,
        genReport,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisters = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error(
      "useRegisters debe ser usado dentro de un RegisterProvider"
    );
  }
  return context;
};

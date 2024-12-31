import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "~/context/auth.context";
import { RegistrationProcess } from "~/interfaces/registration-processes.interface";
import {
  getProcesses,
  addProcess,
  deleteProcess,
  toggleProcess,
  updateProcess,
  getProcess,
} from "~/api/registration-processes";

interface RegistrationProcessContextProps {
  processes: RegistrationProcess[];
  addOneProcess: (process: RegistrationProcess) => Promise<void>;
  updateOneProcess: (process: Partial<RegistrationProcess>, processId: string) => Promise<void>;
  removeProcess: (processId: string) => Promise<void>;
  isEditDialogOpen: boolean;
  isEnableDialogOpen: boolean;
  isDetailDialogOpen: boolean;
  selectedProcessId: string;
  toggleEditDialog: (processId?: string) => void;
  toggleEnableDialog: (processId?: string) => void;
  toggleDetailDialog: (processId?: string) => void;
  toggleStatus: (processId: string) => Promise<RegistrationProcess>;
  getOneProcess: (processId: string) => Promise<RegistrationProcess>;
  setEditDialogOpen: (isOpen: boolean) => void;
  setDetailDialogOpen: (isOpen: boolean) => void;
}


const RegistrationProcessContext = createContext<
  RegistrationProcessContextProps | undefined
>(undefined);

export const RegistrationProcessProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { token } = useAuth();
  const [processes, setProcesses] = useState<RegistrationProcess[]>([]);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false);
  const [isEnableDialogOpen, setEnableDialogOpen] = useState(false);
  const [selectedProcessId, setSelectedProcessId] = useState<string>("");

  useEffect(() => {
    const fetchProcesses = async () => {
      if (!token) return;
      try {
        const fetchedProcesses = await getProcesses(token);
        setProcesses(fetchedProcesses);
      } catch (error) {
        console.error("Error al cargar los procesos:", error);
      }
    };

    fetchProcesses();
  }, [token]);

  const addOneProcess = async (process: RegistrationProcess) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      const newProcess = await addProcess(process, token);
      setProcesses((prevProcesses) => [...prevProcesses, newProcess]);
    } catch (error) {
      console.error("Error al agregar proceso:", error);
      throw error;
    }
  };

  const updateOneProcess = async (process: Partial<RegistrationProcess>, processId: string): Promise<void> => {
    if (!token) throw new Error("Token no encontrado");
    try {
      updateProcess(processId, process, token).then((updatedProcess) => {
        setProcesses((prevProcesses) =>
          prevProcesses.map((p) => (p._id == processId ? updatedProcess : p))
        );
      })
      return;
    } catch (error) {
      console.error("Error al actualizar proceso:", error);
      throw error;
    }
  };

  const removeProcess = async (processId: string) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      await deleteProcess(processId, token);
      setProcesses((prevProcesses) =>
        prevProcesses.filter((process) => process._id !== processId)
      );
    } catch (error) {
      console.error("Error al eliminar proceso:", error);
      throw error;
    }
  };

  const toggleStatus = async (processId: string): Promise<RegistrationProcess> => {
    if (!token) throw new Error("Token no encontrado");
    try {
      return await toggleProcess(processId, token).then((updateProcess) => {
        setProcesses((prevProcesses) =>
          prevProcesses.map((p: RegistrationProcess) =>
            p._id === updateProcess._id ? updateProcess : p
          )
        );
        return updateProcess
      });
    } catch (error) {
      throw error;
    }
  };

  const toggleEditDialog = (processId?: string) => {
    setSelectedProcessId(processId || "");
    setEditDialogOpen((prev) => !prev);
  };

  const toggleEnableDialog = (processId?: string) => {
    setSelectedProcessId(processId || "");
    setEnableDialogOpen((prev) => !prev);
  };

  const toggleDetailDialog = (processId?: string) => {
    setSelectedProcessId(processId || "");
    setDetailDialogOpen((prev) => !prev);
  };

  const getOneProcess = async (processId: string): Promise<RegistrationProcess> => {
    if (!token) throw new Error("Token no encontrado");
    try {
        const data =  await getProcess(processId, token)
        return data
    } catch (error) {
      throw error;
    }
  }

  return (
    <RegistrationProcessContext.Provider
      value={{
        processes,
        addOneProcess,
        updateOneProcess,
        removeProcess,
        isEditDialogOpen,
        isEnableDialogOpen,
        isDetailDialogOpen,
        selectedProcessId,
        toggleEditDialog,
        toggleEnableDialog,
        toggleDetailDialog,
        toggleStatus,
        getOneProcess,
        setEditDialogOpen,
        setDetailDialogOpen
      }}
    >
      {children}
    </RegistrationProcessContext.Provider>
  );
};

export const useRegistrationProcesses = () => {
  const context = useContext(RegistrationProcessContext);
  if (!context) {
    throw new Error(
      "useRegistrationProcesses debe ser usado dentro de un RegistrationProcessProvider"
    );
  }
  return context;
};

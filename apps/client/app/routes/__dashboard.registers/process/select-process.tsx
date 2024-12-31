import React, { useState, useEffect } from "react";
import { getProcesses } from "~/api/registration-processes";
import { RegistrationProcess } from "~/interfaces/registration-processes.interface";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "~/components/ui/select";
import { useAuth } from "~/context/auth.context";
import { Button } from "~/components/ui/button";
import { useRegisterSteps } from "~/context/register-steps-context";
import { CardTitle } from "~/components/ui/card";

const ProcessSelector: React.FC = () => {
  const { token } = useAuth();
  const [processes, setProcesses] = useState<RegistrationProcess[]>([]);
  const [selectedProcessId, setSelectedProcessId] = useState<string>("");
  const { setProcess, addRegister, api } = useRegisterSteps();

  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        if (token == null) return;
        const fetchedProcesses = await getProcesses(token);
        setProcesses(fetchedProcesses);
      } catch (error) {
        console.error("Error al cargar los procesos:", error);
      }
    };

    fetchProcesses();
  }, [token]);

  const handleSelectProcess = (processId: string) => {
    const selectedProcess = processes.find(
      (process) => process._id === processId
    );
    if (selectedProcess) {
      setSelectedProcessId(processId);
      setProcess(selectedProcess);
    }
  };

  return (
    <div className="max-w-[100%] flex flex-col">
      <CardTitle>Proceso</CardTitle>
      <label className="text-sm font-medium mb-2 max-w-full pt-2">
        Selecciona un Proceso de Matrícula
      </label>
      <Select value={selectedProcessId} onValueChange={handleSelectProcess}>
        <SelectTrigger className="max-w-full">
          <SelectValue placeholder="Selecciona un proceso" />
        </SelectTrigger>
        <SelectContent className="max-w-full">
          <SelectGroup>
            {processes.map((process) => (
              <SelectItem
                key={process._id}
                value={process._id}
                className="flex items-center gap-2 max-w-full"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    process.status ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
                {process.name} - {process.status ? "Activo" : "Inactivo"}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="mt-4 max-w-full">
        {selectedProcessId && (
          <Button
            onClick={() => {
              api?.scrollNext();
            }}
            className="max-w-full"
          >
            Siguiente
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProcessSelector;

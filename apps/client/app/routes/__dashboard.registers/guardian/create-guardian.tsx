import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { FormGuardian } from "./form-guardian";
import { Guardian } from "~/interfaces/guardian.interface";
import { useRegisterSteps } from "~/context/register-steps-context";
import toast from "react-hot-toast";
import { Input } from "~/components/ui/input";
import { CardTitle } from "~/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";

export function CreateGuardian() {
  const {
    guardian,
    setGuardian,
    validateOneGuardian,
    previous,
    searchOneGuardian,
    isGuardianExisting,
    setIsGuardianExisting,
    api,
  } = useRegisterSteps();
  const [isEditable, setIsEditable] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [dni, setDni] = useState("");

  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDni(e.target.value);
    setIsVerified(false);
    setIsEditable(false);
    setIsGuardianExisting(false); // Reinicia el estado de existencia al cambiar el DNI
  };

  const handleDniVerify = async () => {
    if (dni.length !== 8) {
      toast.error("El DNI debe tener 8 dígitos");
      return;
    }

    try {
      const existingGuardian = await searchOneGuardian(dni);
      setGuardian(existingGuardian);
      toast.success("Apoderado encontrado. Puede continuar.");
      setIsVerified(true);
      setIsEditable(false);
    } catch (error) {
      toast.error("DNI no encontrado. Complete los datos.");
      setGuardian((prev) => ({ ...prev, dni }));
      setIsVerified(true);
      setIsEditable(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setGuardian((prev: Guardian) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!isGuardianExisting) {
        toast.promise(validateOneGuardian(), {
          loading: "Guardando...",
          success: <b>Apoderado creado correctamente.</b>,
          error: (err: any) => `${err.toString()}`,
        });
      } else {
        toast.success("Apoderado existente validado.");
        api?.scrollNext();
      }
    } catch (error) {
      console.error("Error al crear o validar apoderado:", error);
      toast.error("Error al procesar el apoderado.");
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col h-full">
        <CardTitle>Apoderado</CardTitle>
        <div className="grid grid-cols-4 w-full items-center gap-4 mb-4 py-2">
          <Label className="text-right">DNI</Label>
          <div className="col-span-3 flex items-center gap-2">
            <Input
              id="dni"
              type="text"
              value={dni}
              onChange={handleDniChange}
              placeholder="Enter DNI"
              className="flex-1"
            />
            <Button type="button" onClick={handleDniVerify}>
              Verify
            </Button>
          </div>
        </div>
        <FormGuardian
          formData={guardian}
          onInputChange={handleInputChange}
          setFormData={setGuardian}
          isEditable={isEditable}
        />
      </div>
        <div>
          <Button type="button" variant="outline" onClick={previous}>
            Retroceder
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={!isVerified}>
            Siguiente
          </Button>
        </div>
    </div>
  );
}

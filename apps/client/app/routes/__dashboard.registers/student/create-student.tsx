import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { FormStudent } from "./form-student";
import { Student } from "~/interfaces/students.interface";
import { useRegisterSteps } from "~/context/register-steps-context";
import toast from "react-hot-toast";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { CardTitle } from "~/components/ui/card";

export function CreateStudent() {
  const { 
    student, 
    setStudent, 
    validateOneStudent, 
    searchOneStudent, 
    isStudentExisting, 
    setIsStudentExisting,
    api
  } = useRegisterSteps();
  const [image, setImage] = useState<File | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [dni, setDni] = useState("");
  const [formData, setFormData] = useState<Student>(student);

  useEffect(() => {
    setFormData(student);
  }, [student]);

  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDni(e.target.value);
    setIsVerified(false);
    setIsEditable(false);
    setIsStudentExisting(false); // Reinicia el estado de existencia al cambiar el DNI
  };

  const handleDniVerify = async () => {
    if (dni.length !== 8) {
      toast.error("El DNI debe tener 8 dígitos");
      return;
    }

    try {
      const existingStudent = await searchOneStudent(dni);
      setStudent(existingStudent);
      toast.success("Estudiante encontrado. Puede continuar.");
      setIsVerified(true);
      setIsEditable(false);
    } catch (error) {
      toast.error("DNI no encontrado. Complete los datos.");
      setStudent((prev) => ({ ...prev, dni }));
      setIsVerified(true);
      setIsEditable(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev: Student) => ({
      ...prev,
      [id]: value,
    }));
    setStudent((prev: Student) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!isStudentExisting) {
        const formDataToSubmit = { ...formData, image: image ? URL.createObjectURL(image) : undefined };
        setStudent(formDataToSubmit);

        await toast.promise(validateOneStudent(), {
          loading: "Validando...",
          success: <b>Estudiante creado correctamente.</b>,
          error: (err: any) => `${err.toString()}`,
        });

      } else {
        toast.success("Estudiante existente validado.");
        api?.scrollNext()
      }
    } catch (error) {
      console.error("Error al crear o validar estudiante:", error);
      toast.error("Error al procesar el estudiante.");
    }
  };

  return (
    <div className="w-full">
      <CardTitle>Alumno</CardTitle>
      <div className="grid grid-cols-4 w-full items-center gap-4 mb-4 py-2">
        <Label htmlFor="dni" className="text-right">
          DNI
        </Label>
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
      <FormStudent
        formData={formData}
        onInputChange={handleInputChange}
        setFormData={setFormData}
        setImage={setImage}
        isEditable={isEditable}
      />
      <Button type="button" onClick={handleSubmit} disabled={!isVerified}>
        Siguiente
      </Button>
    </div>
  );
}

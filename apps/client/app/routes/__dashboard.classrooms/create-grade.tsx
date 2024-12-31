import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import toast from "react-hot-toast";
import { useClassroom } from "~/context/classrooms-context";
import { Grade } from "~/interfaces/classrooms.interface";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Label } from "~/components/ui/label";

export function CreateGrade() {
  const { addOneGrade, levels } = useClassroom();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<Omit<Grade, "_id" | "createdAt" | "updatedAt" | "sections">>({
    name: "",
    levelId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "capacity" ? parseInt(value, 10) : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    console.log(value)
    setFormData((prev) => ({
      ...prev,
      levelId: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.levelId) {
        toast.error("Debes seleccionar un nivel.");
        return;
      }

      await toast.promise(
        addOneGrade(
          {
            name: formData.name,
            levelId: formData.levelId,
          },
          formData.levelId
        ),
        {
          loading: "Guardando...",
          success: <b>¡El grado se creó exitosamente!</b>,
          error: (err) => `${err.toString()}`,
        }
      );
      setIsOpen(false);
      setFormData({ name: "", levelId: "" });
    } catch (error) {
      console.error("Error al crear grado:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Crear Grado</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Grado</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>
              Nombre del Grado
            </Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Ejemplo: 1° Primaria"
            />
          </div>
          <div>
            <Label>
              Seleccionar Nivel
            </Label>
            <Select
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un Nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                    {levels.map((level) => (
                        <SelectItem key={level._id || ""} value={level._id || ""}> {level.name} </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Cerrar
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Crear Grado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    );
}

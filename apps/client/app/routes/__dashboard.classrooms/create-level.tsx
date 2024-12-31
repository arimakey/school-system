import { useState } from "react";
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
import { Level } from "~/interfaces/classrooms.interface";
import { Input } from "~/components/ui/input";
import { Label } from '~/components/ui/label';

export function CreateLevel() {
  const { addOneLevel } = useClassroom();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<Omit<Level, "_id" | "createdAt" | "updatedAt" | "grades">>({ name: ""  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "capacity" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await toast.promise(
        addOneLevel(formData),
        {
          loading: "Guardando...",
          success: <b>¡El nivel se creó exitosamente!</b>,
          error: (err) => `${err.toString()}`,
        }
      );
      setIsOpen(false);
      setFormData({ name: "" });
    } catch (error) {
      console.error("Error al crear nivel:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Crear Nivel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Nivel</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>
              Nombre del Nivel
            </Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Ejemplo: Primaria"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Cerrar
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Crear Nivel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

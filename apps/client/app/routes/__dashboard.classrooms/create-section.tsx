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
import { Section } from "~/interfaces/classrooms.interface";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";

export function CreateSection() {
  const { addOneSection, levels, fetchGradesByLevel, grades } = useClassroom();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<Omit<Section, "_id" | "createdAt" | "updatedAt">>({
    name: "",
    capacity: 0,
    gradeId: "",
  });

  const [selectedLevelId, setSelectedLevelId] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "capacity" ? parseInt(value, 10) : value,
    }));
  };

  const handleLevelChange = async (value: string) => {
    setSelectedLevelId(value);
    setFormData((prev) => ({ ...prev, gradeId: "" }));
    try {
      await fetchGradesByLevel(value);
    } catch (error) {
      console.error("Error al cargar grados:", error);
      toast.error("Error al cargar grados del nivel.");
    }
  };

  const handleGradeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gradeId: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.gradeId) {
        toast.error("Debes seleccionar un grado.");
        return;
      }

      await toast.promise(
        addOneSection(
          {
            name: formData.name,
            capacity: formData.capacity,
            gradeId: formData.gradeId,
          },
          formData.gradeId
        ),
        {
          loading: "Guardando...",
          success: <b>¡La sección se creó exitosamente!</b>,
          error: (err) => `${err.toString()}`,
        }
      );
      setIsOpen(false);
      setFormData({ name: "", capacity: 0, gradeId: "" });
      setSelectedLevelId("");
    } catch (error) {
      console.error("Error al crear sección:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Crear Sección</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Sección</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Nombre de la Sección</Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Ejemplo: Sección A"
            />
          </div>
          <div>
            <Label>Capacidad</Label>
            <Input
              type="number"
              id="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Ejemplo: 30"
            />
          </div>
          <div>
            <Label>Seleccionar Nivel</Label>
            <Select onValueChange={handleLevelChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un Nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {levels.map((level) => (
                    <SelectItem key={level._id || ""} value={level._id || ""}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {selectedLevelId && (
            <div>
              <Label>Seleccionar Grado</Label>
              <Select onValueChange={handleGradeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un Grado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {grades.map((grade) => (
                      <SelectItem key={grade._id || ""} value={grade._id || ""}>
                        {grade.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Cerrar
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Crear Sección
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

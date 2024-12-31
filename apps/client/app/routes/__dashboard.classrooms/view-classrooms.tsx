import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useClassroom } from "~/context/classrooms-context";
import toast from "react-hot-toast";

export default function SectionsManager() {
  const {
    levels,
    grades,
    sections,
    fetchGradesByLevel,
    fetchSectionsByGrade,
    toggleDeleteDialog,
    setSelectedSection
    // toggleEditDialog,
    // toggleEnableDialog,
  } = useClassroom();

  const [selectedLevelId, setSelectedLevelId] = useState<string>("");
  const [selectedGradeId, setSelectedGradeId] = useState<string>("");

  useEffect(() => {
    if (selectedLevelId) {
      console.log("Hola mundo");
      fetchGradesByLevel(selectedLevelId).catch(() => {
        toast.error("Error al cargar grados.");
      });
      setSelectedGradeId("");
    }
  }, [selectedLevelId]);

  useEffect(() => {
    if (selectedGradeId) {
      fetchSectionsByGrade(selectedGradeId).catch(() => {
        toast.error("Error al cargar secciones.");
      });
    }
  }, [selectedGradeId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium mb-2">
            Seleccionar Nivel
          </label>
          <Select onValueChange={(value) => setSelectedLevelId(value)}>
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
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium mb-2">
              Seleccionar Grado
            </label>
            <Select onValueChange={(value) => setSelectedGradeId(value)}>
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
      {selectedGradeId && (
        <div>
          <h2 className="text-lg font-bold mb-4">Secciones</h2>
          {sections.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sections.map((section) => (
                <Card key={section._id} className="shadow-md">
                  <CardHeader>
                    <CardTitle>{section.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>Capacidad:</strong> {section.capacity}
                      </p>
                      <p>
                        <strong>Grado:</strong> {section.gradeId}{" "}
                        {/* Puedes mostrar el nombre del grado si está disponible */}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        // onClick={() => toggleEditDialog(section.id)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setSelectedSection(section)
                          toggleDeleteDialog()
                        }}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No hay secciones disponibles para este grado.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

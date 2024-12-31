import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import toast from "react-hot-toast";
import {
  getLevels,
  getGradesByLevel,
  getSectionsByGradeWithCapacity,
} from "~/api/classrooms";
import { Grade, Level, Section } from "~/interfaces/classrooms.interface";
import { useAuth } from "~/context/auth.context";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useRegisterSteps } from "~/context/register-steps-context";
import { useRegisters } from "~/context/register-context";

export default function SectionsManager({setOpen}) {
  const { token } = useAuth();
  const { classroom, setClassroom, api, addRegister, process, setAp } = useRegisterSteps();
  const { addOneRegister } = useRegisters()
  const [levels, setLevels] = useState<Level[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedLevelId, setSelectedLevelId] = useState<string>("");
  const [selectedGradeId, setSelectedGradeId] = useState<string>("");

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        if (token == null) return;
        const fetchedLevels = await getLevels(token);
        setLevels(fetchedLevels);
      } catch (error) {
        toast.error("Error al cargar niveles.");
      }
    };

    fetchLevels();
  }, []);

  useEffect(() => {
    if (selectedLevelId) {
      const fetchGrades = async () => {
        try {
          if (token == null) return;
          const fetchedGrades = await getGradesByLevel(selectedLevelId, token);
          setGrades(fetchedGrades);
        } catch (error) {
          toast.error("Error al cargar grados.");
        }
      };

      fetchGrades();
      setSelectedGradeId("");
    }
  }, [selectedLevelId]);

  useEffect(() => {
    if (selectedGradeId) {
      const fetchSections = async () => {
        try {
          if (token == null) return;
          const fetchedSections = await getSectionsByGradeWithCapacity(
            selectedGradeId,
            process._id,
            token
          );
          setSections(fetchedSections);
        } catch (error) {
          toast.error("Error al cargar secciones.");
        }
      };

      fetchSections();
    }
  }, [selectedGradeId]);

  const handleSelectSection = (section: Section) => {
    setAp(true)
    if(section.capacity <= 0) {
      toast.success("Se agregara como matricula excepcional")
      setAp(false)
    }
    setClassroom(section);
    api?.scrollNext();
  };

  const handleEnrollment = () => {
    addRegister()
      .then((reg) => {
        console.log(reg)
        if(reg.isAprobated) addOneRegister(reg)
        setOpen(false)
        toast.success("Matrícula completada exitosamente")
      })
      .catch(() => toast.error("Error al completar la matrícula"));
  };

  return (
    <div className="flex flex-col h-full py-2 w-full max-w-screen-lg mx-auto">
      <CardTitle className="mb-4">Estudiante</CardTitle>
      <div className="w-full">
        <div className="w-full flex flex-col">
          <div>
            <Label>Seleccionar Nivel</Label>
            <Select onValueChange={(value) => setSelectedLevelId(value)}>
              <SelectTrigger className="w-full max-w-full">
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
            <div className="w-full mt-4">
              <Label>Seleccionar Grado</Label>
              <Select onValueChange={(value) => setSelectedGradeId(value)}>
                <SelectTrigger className="w-full max-w-full">
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
          <div className="w-full mt-4">
            <h2 className="text-lg font-bold mb-4">Secciones</h2>
            {sections.length ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
                {sections.map((section) => (
                  <Card
                    key={section._id}
                    className={`shadow-md cursor-pointer ${
                      classroom?._id === section._id
                        ? "bg-blue-100"
                        : "bg-white"
                    }`}
                    onClick={() => handleSelectSection(section)}
                  >
                    <CardHeader>
                      <CardTitle>{section.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-600">
                        <p>
                          <strong>Capacidad:</strong> {section.capacity > 0 ? section.capacity : 0}
                        </p>
                      </div>
                    </CardContent>
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

        {!!classroom && (
          <div className="mt-4">
            <Button onClick={handleEnrollment} className="w-full">
              Matricular
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

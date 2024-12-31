import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "~/context/auth.context";
import { Level, Grade, Section } from "~/interfaces/classrooms.interface";
import {
  getLevels,
  addLevel,
  getGradesByLevel,
  addGrade,
  getSectionsByGrade,
  addSection,
  deleteSection,
} from "~/api/classrooms";

interface ClassroomContextProps {
  levels: Level[];
  grades: Grade[];
  sections: Section[];
  selectedSection: Section | null;
  setSelectedSection: (section: Section | null) => void;
  editDialogOpen: boolean;
  deleteDialogOpen: boolean;
  toggleEditDialog: () => void;
  toggleDeleteDialog: () => void;
  addOneLevel: (level: Omit<Level, "id" | "createdAt" | "updatedAt" | "grades">) => Promise<void>;
  addOneGrade: (grade: Omit<Grade, "id" | "createdAt" | "updatedAt" | "sections">, levelId: string) => Promise<void>;
  addOneSection: (section: Omit<Section, "id" | "createdAt" | "updatedAt">, gradeId: string) => Promise<void>;
  fetchGradesByLevel: (levelId: string) => Promise<void>;
  fetchSectionsByGrade: (gradeId: string) => Promise<void>;
  removeSection: (sectionId: string) => Promise<void>;
}

const ClassroomContext = createContext<ClassroomContextProps | undefined>(undefined);

export const ClassroomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [levels, setLevels] = useState<Level[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchLevels = async () => {
      if (!token) return;
      try {
        const fetchedLevels = await getLevels(token);
        setLevels(fetchedLevels);
      } catch (error) {
        console.error("Error al cargar los niveles:", error);
      }
    };

    fetchLevels();
  }, [token]);

  const toggleEditDialog = () => setEditDialogOpen((prev) => !prev);
  const toggleDeleteDialog = () => setDeleteDialogOpen((prev) => !prev);

  const addOneLevel = async (level: Omit<Level, "id" | "createdAt" | "updatedAt" | "grades">) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      const newLevel = await addLevel(level, token);
      setLevels((prevLevels) => [...prevLevels, newLevel]);
    } catch (error) {
      console.error("Error al agregar nivel:", error);
      throw error;
    }
  };

  const addOneGrade = async (
    grade: Omit<Grade, "id" | "createdAt" | "updatedAt" | "sections">,
    levelId: string
  ) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      const newGrade = await addGrade(grade, token);
      setGrades((prevGrades) => [...prevGrades, newGrade]);
      setLevels((prevLevels) =>
        prevLevels.map((level) =>
          level._id === levelId ? { ...level, grades: [...(level.grades || []), newGrade] } : level
        )
      );
    } catch (error) {
      console.error("Error al agregar grado:", error);
      throw error;
    }
  };

  const addOneSection = async (
    section: Omit<Section, "id" | "createdAt" | "updatedAt">,
    gradeId: string
  ) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      const newSection = await addSection(section, token);
      setSections((prevSections) => [...prevSections, newSection]);
      setGrades((prevGrades) =>
        prevGrades.map((grade) =>
          grade._id === gradeId ? { ...grade, sections: [...(grade.sections || []), newSection] } : grade
        )
      );
    } catch (error) {
      console.error("Error al agregar sección:", error);
      throw error;
    }
  };

  const removeSection = async (sectionId: string) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      const response = await deleteSection(sectionId, token);
      setSections((prevSections) => prevSections.filter((section) => section._id !== response._id));
    } catch (error) {
      console.error("Error al eliminar sección:", error);
      throw error;
    }
  };

  const fetchGradesByLevel = async (levelId: string) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      const fetchedGrades = await getGradesByLevel(levelId, token);
      setGrades(fetchedGrades);
    } catch (error) {
      console.error("Error al cargar grados:", error);
      throw error;
    }
  };

  const fetchSectionsByGrade = async (gradeId: string) => {
    if (!token) throw new Error("Token no encontrado");
    try {
      const fetchedSections = await getSectionsByGrade(gradeId, token);
      setSections(fetchedSections);
    } catch (error) {
      console.error("Error al cargar secciones:", error);
      throw error;
    }
  };

  return (
    <ClassroomContext.Provider
      value={{
        levels,
        grades,
        sections,
        selectedSection,
        setSelectedSection,
        editDialogOpen,
        deleteDialogOpen,
        toggleEditDialog,
        toggleDeleteDialog,
        addOneLevel,
        addOneGrade,
        addOneSection,
        fetchGradesByLevel,
        fetchSectionsByGrade,
        removeSection,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
};

export const useClassroom = () => {
  const context = useContext(ClassroomContext);
  if (!context) {
    throw new Error("useClassroom debe ser usado dentro de un ClassroomProvider");
  }
  return context;
};

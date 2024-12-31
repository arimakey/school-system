import React, { createContext, useContext, useState, useEffect } from "react";
import { deleteStudent, getStudents, postStudent } from "~/api/student";
import { Student } from "~/interfaces/students.interface";
import { useAuth } from "~/context/auth.context";

interface StudentContextProps {
  students: Student[];
  addStudent: (student: Student) => Promise<void>;
  removeStudent: (studentId: string) => Promise<void>;
  isDeleteDialogOpen: boolean;
  isDetailDialogOpen: boolean;
  selectedStudentId: string;
  toggleDeleteDialog: (studentId?: string) => void;
  toggleDetailDialog: (studentId?: string) => void;
}

const StudentContext = createContext<StudentContextProps | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [students, setStudentsState] = useState<Student[]>([]);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  useEffect(() => {
    const fetchStudents = async () => {
      if (token) {
        try {
          const fetchedStudents: Student[] = await getStudents(token);
          setStudentsState(fetchedStudents);
        } catch (error: any) {
          console.error("Error al cargar los estudiantes:", error.message);
        }
      }
    };

    fetchStudents();
  }, [token]);

  const addStudent = async (student: Student) => {
    try {
      if (!token) throw new Error("Token no encontrado");
      const newStudent = await postStudent(student, token);
      setStudentsState((prevStudents) => [...prevStudents, newStudent]);
    } catch (error: any) {
      console.error("Error al agregar estudiante:", error.message);
    }
  };

  const removeStudent = async (studentId: string) => {
    try {
      if (!token) throw new Error("Token no encontrado");
      await deleteStudent(studentId, token);
      setStudentsState((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
    } catch (error: any) {
      throw error;
    }
  };

  const toggleDeleteDialog = (studentId?: string) => {
    setSelectedStudentId(studentId || "");
    setDeleteDialogOpen((prev) => !prev);
  };

  const toggleDetailDialog = (studentId?: string) => {
    setSelectedStudentId(studentId || "");
    setDetailDialogOpen((prev) => !prev);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        removeStudent,
        isDeleteDialogOpen,
        isDetailDialogOpen,
        selectedStudentId,
        toggleDeleteDialog,
        toggleDetailDialog,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents debe ser usado dentro de un StudentProvider");
  }
  return context;
};

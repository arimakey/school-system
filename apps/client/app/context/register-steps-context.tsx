import React, { createContext, useContext, useState } from "react";
import { postStudent, searchStudent, validateStudent } from "~/api/student";
import { CarouselApi } from "~/components/ui/carousel";
import { Section } from "~/interfaces/classrooms.interface";
import { Guardian } from "~/interfaces/guardian.interface";
import { Student } from "~/interfaces/students.interface";
import { useAuth } from "./auth.context";
import { postGuardian, searchGuardian, validateGuardian } from "~/api/guardian";
import { RegistrationProcess } from "~/interfaces/registration-processes.interface";
import { createRegister } from "~/api/registers";
import toast from "react-hot-toast";
import { Register } from "~/interfaces/registers.interface";

interface RegisterStepsContextProps {
  student: Student;
  setStudent: React.Dispatch<React.SetStateAction<Student>>;
  guardian: Guardian;
  setGuardian: React.Dispatch<React.SetStateAction<Guardian>>;
  classroom: Section;
  setClassroom: React.Dispatch<React.SetStateAction<Section>>;
  api: CarouselApi | null;
  setApi: React.Dispatch<React.SetStateAction<CarouselApi | null>>;
  validateOneStudent: () => Promise<void>;
  validateOneGuardian: () => Promise<void>;
  previous: () => void;
  process: RegistrationProcess;
  setProcess: React.Dispatch<React.SetStateAction<RegistrationProcess>>;
  addRegister: () => Promise<Register>;
  searchOneGuardian: (dni: string) => Promise<Guardian>;
  searchOneStudent: (dni: string) => Promise<Student>;
  isStudentExisting: boolean;
  setIsStudentExisting: React.Dispatch<React.SetStateAction<boolean>>;
  isGuardianExisting: boolean;
  setIsGuardianExisting: React.Dispatch<React.SetStateAction<boolean>>;
  isAp: boolean;
  setAp: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterStepsContext = createContext<RegisterStepsContextProps | undefined>(undefined);

export const RegisterStepsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [student, setStudent] = useState<Student>({
    code: "",
    name: "",
    last_name: "",
    dni: "",
    email: "",
    birthdate: new Date(),
    address: "",
    phoneNumber: "",
    enrollmentDate: new Date(),
    gender: "other",
  });
  const [guardian, setGuardian] = useState<Guardian>({} as Guardian);
  const [classroom, setClassroom] = useState<Section>({} as Section);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [process, setProcess] = useState<RegistrationProcess>({} as RegistrationProcess);
  const [isStudentExisting, setIsStudentExisting] = useState(false);
  const [isGuardianExisting, setIsGuardianExisting] = useState(false);
  const [isAp, setAp] = useState(true);

  const validateOneStudent = async () => {
    if (!token) throw new Error("Token no encontrado");

    try {
      await validateStudent(student, token);
      api?.scrollNext();
    } catch (error) {
      console.error("Error validando estudiante:", error);
      throw error;
    }
  };

  const validateOneGuardian = async () => {
    if (!token) throw new Error("Token no encontrado");

    try {
      await validateGuardian(guardian, token);
      api?.scrollNext();
    } catch (error) {
      console.error("Error validando apoderado:", error);
      throw error;
    }
  };

  const previous = () => {
    api?.scrollPrev();
  };

  const addRegister = async () => {
    if (!token) throw new Error("Token no encontrado");
  
    try {
      let studentId = student._id;
      let guardianId = guardian._id;
  
      if (!isStudentExisting) {
        const newStudent: Student = await toast.promise(
          postStudent(student, token),
          {
            loading: "Registrando estudiante...",
            success: "Estudiante registrado correctamente",
            error: "Error al registrar estudiante",
          }
        );
        studentId = newStudent._id;
      }
  
      if (!isGuardianExisting) {
        const newGuardian: Guardian = await toast.promise(
          postGuardian(guardian, token),
          {
            loading: "Registrando apoderado...",
            success: "Apoderado registrado correctamente",
            error: "Error al registrar apoderado",
          }
        );
        guardianId = newGuardian._id;
      }
  
      const register = {
        student: studentId,
        guardian: guardianId,
        classroom: classroom._id,
        registrationProcess: process._id,
        isAprobated: isAp
      };

      const createdRegister = await toast.promise(
        createRegister(register, token).then((newRegister) => {
          setStudent({} as Student);
          setGuardian({} as Guardian);
          setAp(true)
          return newRegister;
        }),
        {
          loading: "Creando registro...",
          success: "Registro creado exitosamente",
          error: "Error al crear el registro",
        }
      );
      
      return createdRegister; 
    } catch (error) {
      console.error("Error al crear el registro:", error);
      throw error;
    }
  };
  

  const searchOneGuardian = async (dni: string): Promise<Guardian> => {
    if (!token) throw new Error("Token no encontrado");
    const guardian = await searchGuardian(dni, token);
    setIsGuardianExisting(true);
    return guardian;
  };

  const searchOneStudent = async (dni: string): Promise<Student> => {
    if (!token) throw new Error("Token no encontrado");
    const student = await searchStudent(dni, token);
    setIsStudentExisting(true);
    return student;
  };

  return (
    <RegisterStepsContext.Provider
      value={{
        student,
        setStudent,
        guardian,
        setGuardian,
        classroom,
        setClassroom,
        api,
        setApi,
        validateOneStudent,
        validateOneGuardian,
        previous,
        process,
        setProcess,
        addRegister,
        searchOneGuardian,
        searchOneStudent,
        isStudentExisting,
        setIsStudentExisting,
        isGuardianExisting,
        setIsGuardianExisting,
        isAp,
        setAp
      }}
    >
      {children}
    </RegisterStepsContext.Provider>
  );
};

export const useRegisterSteps = () => {
  const context = useContext(RegisterStepsContext);
  if (!context) {
    throw new Error("useRegisterSteps must be used within a RegisterStepsProvider");
  }
  return context;
};

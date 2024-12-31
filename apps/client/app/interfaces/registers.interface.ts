import { Section } from "./classrooms.interface";
import { Guardian } from "./guardian.interface";
import { RegistrationProcess } from "./registration-processes.interface";
import { Student } from "./students.interface";

export interface Register {
  _id: string;
  student: Student;
  guardian: Guardian;
  classroom: Section;
  registrationProcess: RegistrationProcess;
  isAprobated?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRegister {
  studentId: string;
  guardianId: string;
  classroomId: string;
  registrationProcessId: string;
}

export interface UpdateRegister {
  studentId?: string;
  guardianId?: string;
  classroomId?: string;
  registrationProcessId?: string;
}

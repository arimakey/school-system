import { Student } from "~/interfaces/students.interface";
import { fetchClient } from "./fetch-client";

export async function getStudents(token: string): Promise<Student[]> {
    return fetchClient("students", { token });
}

export async function postStudent(student : Student, token : string): Promise<Student> {
    try {
      const response = await fetchClient<Student>("students", {
        method: "POST",
        body: JSON.stringify(student),
        token: token
      });

      return response;
    } catch (error: any) {
        throw new Error(error.message || "No se pudo agregar el estudiante.");
    }
}



export async function deleteStudent(id : string, token : string): Promise<Student> {
    try {
      const response = await fetchClient<Student>(`students/${id}`, {
        method: "DELETE",
        token: token
      });

      return response;
    } catch (error: any) {
      throw new Error(error.message || "No se pudo eliminar el estudiante.");
    }
}

export async function searchStudent(dni: string, token: string): Promise<Student[]> {
    return fetchClient(`students/search/${dni}`, { token });
}

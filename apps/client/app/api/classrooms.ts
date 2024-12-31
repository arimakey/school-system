import { fetchClient } from "./fetch-client";
import { Level, Grade, Section } from '~/interfaces/classrooms.interface';

export async function getLevels(token: string): Promise<Level[]> {
  try {
    return await fetchClient<Level[]>("classroom/levels", { token });
  } catch (error: any) {
    throw new Error(error.message || "No se pudieron cargar los niveles.");
  }
}

export async function addLevel(level: Omit<Level, 'id' | 'createdAt' | 'updatedAt' | 'grades'>, token: string): Promise<Level> {
  try {
    return await fetchClient<Level>("classroom/levels", {
      method: "POST",
      body: JSON.stringify(level),
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudo agregar el nivel.");
  }
}

export async function getGradesByLevel(levelId: string, token: string): Promise<Grade[]> {
  try {
    return await fetchClient<Grade[]>(`classroom/grades/${levelId}`, { token });
  } catch (error: any) {
    throw new Error(error.message || "No se pudieron cargar los grados.");
  }
}

export async function addGrade(grade: Omit<Grade, 'id' | 'createdAt' | 'updatedAt' | 'sections'>, token: string): Promise<Grade> {
  try {
    return await fetchClient<Grade>("classroom/grades", {
      method: "POST",
      body: JSON.stringify(grade),
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudo agregar el grado.");
  }
}

export async function getSectionsByGrade(gradeId: string, token: string): Promise<Section[]> {
  try {
    return await fetchClient<Section[]>(`classroom/sections/${gradeId}`, { token });
  } catch (error: any) {
    throw new Error(error.message || "No se pudieron cargar las secciones.");
  }
}

export async function addSection(section: Omit<Section, 'id' | 'createdAt' | 'updatedAt'>, token: string): Promise<Section> {
  try {
    return await fetchClient<Section>("classroom/sections", {
      method: "POST",
      body: JSON.stringify(section),
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudo agregar la sección.");
  }
}


export async function deleteSection(sectionId: string, token: string): Promise<Section> {
  try {
    const data = await fetchClient<Section>(`classroom/sections/${sectionId}`, {
      method: "DELETE",
      token,
    });
    return data
  } catch (error: any) {
    throw new Error(error.message || "No se pudo eliminar la sección.");
  }
}


export async function getSectionsByGradeWithCapacity(gradeId: string, processId: string, token: string): Promise<Section[]> {
  try {
    const resposne = await fetchClient<Section[]>(`registers/sections/${processId}/${gradeId}`, { token });
    console.log(resposne)
    return resposne
  } catch (error: any) {
    throw new Error(error.message || "No se pudieron cargar las secciones.");
  }
}
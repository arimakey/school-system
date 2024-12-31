import { RegistrationProcess } from "~/interfaces/registration-processes.interface";
import { fetchClient } from "./fetch-client";

export async function getProcesses(
  token: string
): Promise<RegistrationProcess[]> {
  try {
    return await fetchClient<RegistrationProcess[]>("registration-processes", {
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudieron cargar los procesos.");
  }
}

export async function addProcess(
  process: RegistrationProcess,
  token: string
): Promise<RegistrationProcess> {
  try {
    return await fetchClient<RegistrationProcess>("registration-processes", {
      method: "POST",
      body: JSON.stringify(process),
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudo agregar el proceso.");
  }
}

export async function updateProcess(
  processId: string,
  process: Partial<RegistrationProcess>,
  token: string
): Promise<RegistrationProcess> {
  try {
    if (!process._id) throw new Error("El proceso no tiene un ID.");

    return await fetchClient<RegistrationProcess>(
      `registration-processes/${processId}`,
      {
        method: "PATCH",
        body: JSON.stringify(process),
        token,
      }
    );
  } catch (error: any) {
    throw new Error(error.message || "No se pudo actualizar el proceso.");
  }
}

export async function deleteProcess(
  id: string,
  token: string
): Promise<RegistrationProcess> {
  try {
    return await fetchClient<RegistrationProcess>(
      `registration-processes/${id}`,
      {
        method: "DELETE",
        token,
      }
    );
  } catch (error: any) {
    throw new Error(error.message || "No se pudo eliminar el proceso.");
  }
}

export async function toggleProcess(
  id: string,
  token: string
): Promise<RegistrationProcess> {
  try {
    if (!id) throw new Error("El proceso no tiene un ID.");

    return await fetchClient<RegistrationProcess>(
      `registration-processes/${id}/toggle-active`,
      {
        method: "PATCH",
        token
      }
    );
  } catch (error: any) {
    throw new Error(error.message || "No se pudo actualizar el proceso.");
  }
}


export async function getProcess(
  id: string, token: string
): Promise<RegistrationProcess> {
  try {
    return await fetchClient<RegistrationProcess>(`registration-processes/${id}`, {
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudieron cargar los procesos.");
  }
}
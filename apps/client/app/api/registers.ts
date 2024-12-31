import { Register } from "~/interfaces/registers.interface";
import { fetchClient } from "./fetch-client";


export async function createRegister(registerData: any, token: string): Promise<Register> {
  try {
    return await fetchClient("registers", {
      method: "POST",
      body: JSON.stringify(registerData),
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudo crear el registro.");
  }
}

export async function getRegisters(token: string): Promise<Register[]> {
  try {
    return await fetchClient("registers", {
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudieron cargar los registros.");
  }
}

export async function getAllRegisters(token: string): Promise<Register[]> {
  try {
    return await fetchClient("registers/all", {
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudieron cargar los registros.");
  }
}


export async function getNotRegisters(token: string): Promise<Register[]> {
  try {
    return await fetchClient("registers/not-aprobated", {
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudieron cargar los registros.");
  }
}

export async function getRegisterById(id: string, token: string): Promise<Register>  {
  try {
    return await fetchClient(`registers/${id}`, {
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudo obtener el registro.");
  }
}

export async function updateRegister(id: string, updateData: any, token: string): Promise<Register>  {
  try {
    return await fetchClient(`registers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudo actualizar el registro.");
  }
}

export async function deleteRegister(id: string, token: string) {
  try {
    return await fetchClient(`registers/${id}`, {
      method: "DELETE",
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudo eliminar el registro.");
  }
}


export async function approveRegisterEndpoint(id: string, token: string): Promise<Register>  {
  try {
    return await fetchClient(`registers/aprobate/${id}`, {
      method: "POST",
      token,
    });
  } catch (error: any) {
    throw new Error(error.message || "No se pudo actualizar el registro.");
  }
}

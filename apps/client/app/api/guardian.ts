import { Guardian } from "~/interfaces/guardian.interface";
import { fetchClient } from "./fetch-client";

export async function postGuardian(guardian : Guardian, token : string): Promise<Guardian> {
    try {
      const response = await fetchClient<Guardian>("guardians", {
        method: "POST",
        body: JSON.stringify(guardian),
        token: token
      });

      return response;
    } catch (error: any) {
        throw new Error(error.message || "No se pudo agregar el estudiante.");
    }
}


export async function validateGuardian(guardian : Guardian, token : string): Promise<Guardian> {
    try {
      const response = await fetchClient<Guardian>("guardians/validate", {
        method: "POST",
        body: JSON.stringify(guardian),
        token: token
      });

      return response;
    } catch (error: any) {
        throw new Error(error.message || "No se pudo agregar el estudiante.");
    }
}

export async function searchGuardian(dni: string, token: string): Promise<Guardian> {
  return fetchClient(`guardians/search/${dni}`, { token });
}

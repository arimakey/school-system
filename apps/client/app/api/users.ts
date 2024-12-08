import { User } from "~/interfaces/user.interface";
import { fetchClient } from "./fetch-client";

export async function getUsers(token: string): Promise<User[]> {
  return fetchClient("users", { token });
}

export async function postUser(user: User, token: string): Promise<User> {
  try {
    const response = await fetchClient<User>("auth/register", {
      method: "POST",
      body: JSON.stringify(user),
      token: token,
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message || "No se pudo agregar el usuario.");
  }
}

export async function deleteUser(id: string, token: string): Promise<User> {
  try {
    const response = await fetchClient<User>(`users/${id}`, {
      method: "DELETE",
      token: token,
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message || "No se pudo eliminar el usuario.");
  }
}
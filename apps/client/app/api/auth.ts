import { fetchClient } from "./fetch-client";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
    access_token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
}

export async function login(
    credentials: LoginCredentials
  ): Promise<LoginResponse> {
    try {
      const response = await fetchClient<LoginResponse>("auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
  
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));
  
      return response;
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      throw new Error(error.message || "No se pudo iniciar sesión.");
    }
}
  
export async function getUserProfile(token: string) {
  return fetchClient("auth/profile", { token });
}

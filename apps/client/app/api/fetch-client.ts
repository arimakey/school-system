const API_BASE_URL = "http://localhost:3000/api";

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function fetchClient<T>(
  endpoint: string,
  { token, headers, ...customConfig }: FetchOptions = {}
): Promise<T> {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...customConfig,
  };

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en la petición");
  }

  return response.json();
}

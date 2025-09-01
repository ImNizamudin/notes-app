// const BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "https://dev-notesapp.radarku.online";
const BASE_URL = "/api";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function parseResponse(res: Response) {
  const text = await res.text();
  if (!text) return null;
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(text || "Unknown response");
  }
  if (json && typeof json === "object" && "data" in json) {
    return json.data;
  }
  return json;
}

export async function apiClient(
  endpoint: string,
  method: RequestMethod = "GET",
  body?: any,
  extraHeaders: Record<string, string> = {}
) {
  const url = `${BASE_URL}${endpoint}`;
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  const headers: Record<string, string> = {
    ...extraHeaders,
  };

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body:
      body instanceof FormData
        ? body
        : body
        ? JSON.stringify(body)
        : undefined,
  });

  const data = await parseResponse(res);

  if (!res.ok) {
    const message =
      (data && (data.message || data.error || (data as any).reason)) ||
      res.statusText ||
      "API Error";
    throw { response: data };
  }
  return data;
}

export default apiClient;

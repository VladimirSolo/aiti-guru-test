import type { Request, Response } from "./_types";

export async function login(
  payload: Request,
): Promise<Response> {
  const response = await fetch(
    "/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка авторизации");
  }

  return data;
}
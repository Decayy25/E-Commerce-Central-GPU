import type { RegisterPayload, LoginResponse } from "../types/TypeAuth";
import type { Response } from "../types/TypeAPI";

export const getProducts = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API}api/product/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.map(({ _id, ...rest }: any) => ({
      ...rest,
    }));
  } catch (error) {
    console.error("Error Fecthing: ", error);
    return [];
  }
};

export const register = async (payload: RegisterPayload): Promise<Response> => {
  const res = await fetch(`${import.meta.env.VITE_API}api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Register gagal");
  }

  alert("Berhasil Register")
  return data;
};

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const res = await fetch(`${import.meta.env.VITE_API}api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login gagal");
  }

  return data;
};

export const getAccounts = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API}api/accounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error Fecthing: ", error);
    return [];
  }
};
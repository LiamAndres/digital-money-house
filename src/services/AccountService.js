/* import { API_BASE_URL } from "./api"; */
const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

export const getAccount = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/account`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al obtener la cuenta");
    }

    const data = await response.json();
    return data; // Devuelve alias, cvu, available_amount, id (account_id) y user_id
  } catch (error) {
    console.error("Error en getAccount:", error.message);
    throw error;
  }
};

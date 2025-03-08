/* import { API_BASE_URL } from "./api"; */
const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

// Definimos una interfaz para el tipo de datos que devuelve el API
interface AccountData {
  id: number; // account_id
  user_id: number;
  alias: string;
  cvu: string;
  available_amount: number;
}

// Especificamos que la función devuelve una "Promise<AccountData>"
export const getAccount = async (token: string): Promise<AccountData> => {
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

    const data: AccountData = await response.json(); // indicamos a TypeScript el tipo de dato
    console.log("Datos de la cuenta obtenidos:", data);

    return data; // Devuelve alias, cvu, available_amount, id (account_id) y user_id
  } catch (error) {
    console.error("Error en getAccount:", (error as Error).message);
    throw error;
  }
};


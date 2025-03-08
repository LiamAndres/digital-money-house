const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

// ✅ Definimos la estructura de los datos de una tarjeta
interface CardData {
  number_id: number; // Número de tarjeta
  cod: number; // Código de seguridad (CVV)
  expiration_date: string; // Fecha de vencimiento
  first_last_name: string; // Titular de la tarjeta
}

// ✅ Interfaz para una tarjeta obtenida del backend
interface Card extends CardData {
  id: number; // ID único de la tarjeta
  account_id: number; // ID de la cuenta a la que pertenece
}

// ✅ Función para crear una nueva tarjeta asociada a la cuenta
export const createCard = async (
  accountId: number,
  token: string,
  cardData: CardData
): Promise<Card> => {
  try {
    console.log("Token enviado:", token); // Para verificar el token
    console.log("Datos enviados al backend:", cardData); // Para verificar el payload

    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/cards`, {
      method: "POST",
      headers: {
        Authorization: token, // Token de autenticación
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData), // Datos de la tarjeta a crear
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al crear la tarjeta");
    }

    const createdCard: Card = await response.json();
    console.log("Nueva tarjeta creada:", createdCard); // Verificar en consola
    return createdCard; // Devuelve los datos de la tarjeta creada
  } catch (error) {
    console.error("Error en createCard:", (error as Error).message);
    throw error;
  }
};

// ✅ Obtener las tarjetas por `account_id`
export const getCards = async (accountId: number, token: string): Promise<Card[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/cards`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al obtener las tarjetas");
    }

    const cards: Card[] = await response.json();
    return cards; // Retorna el array de tarjetas
  } catch (error) {
    console.error("Error en getCards:", (error as Error).message);
    throw error;
  }
};

// ✅ Función para eliminar una tarjeta
export const deleteCard = async (
  accountId: number,
  cardId: number,
  token: string
): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al eliminar la tarjeta");
    }

    return { success: true }; // Retornar un indicador de éxito
  } catch (error) {
    console.error("Error en deleteCard:", (error as Error).message);
    throw error;
  }
};

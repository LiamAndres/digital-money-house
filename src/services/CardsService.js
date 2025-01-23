const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

// Función para crear una nueva tarjeta asociada a la cuenta
export const createCard = async (accountId, token, cardData) => {
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

    const createdCard = await response.json();
    console.log("Nueva tarjeta creada:", createdCard); // Verificar en consola
    return createdCard; // Devuelve los datos de la tarjeta creada
  } catch (error) {
    console.error("Error en createCard:", error.message);
    throw error;
  }
};

// Obtener las tarjetas por account_id
export const getCards = async (accountId, token) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/accounts/${accountId}/cards`,
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al obtener las tarjetas");
      }
  
      const cards = await response.json();
      return cards; // Retorna el array de tarjetas
    } catch (error) {
      console.error("Error en getCards:", error.message);
      throw error;
    }
  };

// Función para eliminar una tarjeta
  export const deleteCard = async (accountId, cardId, token) => {
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
      console.error("Error en deleteCard:", error.message);
      throw error;
    }
  };

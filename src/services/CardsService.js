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

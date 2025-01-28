const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

/**
 * Crea un nuevo depósito asociado a la cuenta del usuario.
 * @param {number} accountId - ID de la cuenta asociada.
 * @param {string} token - Token de autenticación del usuario.
 * @param {object} depositData - Datos del depósito (amount, dated, destination, origin).
 * @returns {Promise<object>} - Respuesta del servidor con la información del depósito.
 */
export const createDeposit = async (accountId, token, depositData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/deposits`, {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(depositData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al realizar el depósito");
        }

        const data = await response.json();
        console.log("Depósito realizado con éxito:", data);

        return data; // Devuelve detalles del depósito realizado
    } catch (error) {
        console.error("Error en createDeposit:", error.message || error);
        throw error;
    }
};

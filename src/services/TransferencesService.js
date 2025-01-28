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

/**
 * Obtiene las transferencias relacionadas a una cuenta.
 * @param {number} accountId - ID de la cuenta.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<object[]>} - Array de transferencias.
 */
export const getTransferences = async (accountId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/transferences`, {
            method: "GET",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al obtener las transferencias");
        }

        const data = await response.json();

        // Validar que los datos devueltos tienen la estructura esperada
        if (!Array.isArray(data)) {
            throw new Error("Datos inválidos: Se esperaba un array");
        }

        // Transformar los datos para que cumplan con la estructura `Transaction`
        const validatedData = data.map((tx) => ({
            account_id: tx.account_id || 0,
            amount: tx.amount || 0,
            dated: tx.dated || "",
            description: tx.description || "Sin descripción",
            destination: tx.destination || "",
            id: tx.id || 0,
            origin: tx.origin || "",
            type: tx.type || "Desconocido",
        }));

        console.log("Transferencias obtenidas y validadas:", validatedData);
        return validatedData; // Retornar los datos validados
    } catch (error) {
        console.error("Error en getTransferences:", error.message || error);
        throw error;
    }
};
const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

/**
 * Crea una nueva transacción asociada a la cuenta del usuario.
 * @param {number} accountId - ID de la cuenta asociada.
 * @param {string} token - Token de autenticación del usuario.
 * @param {object} transactionData - Datos de la transacción (amount, dated, description).
 * @returns {Promise<{ amount: number, dated: string, description: string }>} - Respuesta de la transacción.
 */
export const createTransaction = async (accountId, token, transactionData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/transactions`, {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(transactionData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al crear la transacción");
        }

        const data = await response.json();
        console.log("Transacción creada con éxito:", data);
        return data; // Devuelve los datos de la transacción creada
    } catch (error) {
        console.error("Error en createTransaction:", error.message || error);
        throw error;
    }
};

/**
 * Obtiene todas las transacciones relacionadas a una cuenta.
 * @param {number} accountId - ID de la cuenta.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Transaction[]>} - Array de transacciones.
 */
export const getAllTransactions = async (accountId, token)=> {
    try {
        const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/activity`, {
            method: "GET",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al obtener las transacciones.");
        }

        const data = await response.json();

        // Validar y transformar los datos devueltos
        if (!Array.isArray(data)) {
            throw new Error("La respuesta del servidor no es válida. Se esperaba un array.");
        }

        // Mapear los datos a la estructura esperada
        const validatedData= data.map((tx) => ({
            account_id: tx.account_id || 0,
            amount: tx.amount || 0,
            dated: tx.dated || "",
            description: tx.description || "Sin descripción",
            destination: tx.destination || "",
            id: tx.id || 0,
            origin: tx.origin || "",
            type: tx.type || "Desconocido",
        }));

        console.log("Transacciones obtenidas:", validatedData);
        return validatedData;
    } catch (error) {
        console.error("Error en getAllTransactions:", error instanceof Error ? error.message : error);
        throw error;
    }
};

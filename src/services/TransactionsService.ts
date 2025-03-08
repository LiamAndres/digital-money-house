const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

/**
 * ✅ Definimos la estructura de los datos de una transacción.
 */
interface Transaction {
    id: number;
    account_id: number;
    amount: number;
    dated: string;
    description: string;
    destination?: string; // Opcional
    origin?: string; // Opcional
    type: string;
}

/**
 * ✅ Estructura de los datos requeridos para crear una transacción.
 */
interface TransactionData {
    amount: number;
    dated: string;
    description: string;
}

/**
 * ✅ Crea una nueva transacción asociada a la cuenta del usuario.
 * @param {number} accountId - ID de la cuenta asociada.
 * @param {string} token - Token de autenticación del usuario.
 * @param {TransactionData} transactionData - Datos de la transacción.
 * @returns {Promise<Transaction>} - Respuesta de la transacción creada.
 */
export const createTransaction = async (
    accountId: number,
    token: string,
    transactionData: TransactionData
): Promise<Transaction> => {
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

        const data: Transaction = await response.json();
        console.log("Transacción creada con éxito:", data);
        return data;
    } catch (error) {
        console.error("Error en createTransaction:", (error as Error).message || error);
        throw error;
    }
};

/**
 * ✅ Obtiene todas las transacciones relacionadas a una cuenta.
 * @param {number} accountId - ID de la cuenta.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Transaction[]>} - Array de transacciones.
 */
export const getAllTransactions = async (
    accountId: number,
    token: string
): Promise<Transaction[]> => {
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

        const data: any[] = await response.json(); // `data` es un array de objetos desconocidos

        // Validar y transformar los datos devueltos
        if (!Array.isArray(data)) {
            throw new Error("La respuesta del servidor no es válida. Se esperaba un array.");
        }

        // Mapear los datos a la estructura `Transaction`
        const validatedData: Transaction[] = data.map((tx) => ({
            account_id: tx.account_id ?? 0,
            amount: tx.amount ?? 0,
            dated: tx.dated ?? "",
            description: tx.description ?? "Sin descripción",
            destination: tx.destination ?? "",
            id: tx.id ?? 0,
            origin: tx.origin ?? "",
            type: tx.type ?? "Desconocido",
        }));

        console.log("Transacciones obtenidas:", validatedData);
        return validatedData;
    } catch (error) {
        console.error("Error en getAllTransactions:", (error as Error).message || error);
        throw error;
    }
};

/**
 * ✅ Obtiene los detalles de una transacción específica.
 * @param {number} accountId - ID de la cuenta.
 * @param {number} transactionId - ID de la transacción.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Transaction>} - Detalles de la transacción.
 */
export const getTransactionDetails = async (
    accountId: number,
    transactionId: number,
    token: string
): Promise<Transaction> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/accounts/${accountId}/transactions/${transactionId}`,
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
            throw new Error(errorData.error || "Error al obtener los detalles de la transacción.");
        }

        const data: any = await response.json(); // `data` es un objeto desconocido

        return {
            account_id: data.account_id ?? 0,
            amount: data.amount ?? 0,
            dated: data.dated ?? "",
            description: data.description ?? "Sin descripción",
            destination: data.destination ?? "",
            id: data.id ?? 0,
            origin: data.origin ?? "",
            type: data.type ?? "Desconocido",
        };
    } catch (error) {
        console.error("Error en getTransactionDetails:", (error as Error).message || error);
        throw error;
    }
};

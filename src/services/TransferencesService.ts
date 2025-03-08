const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

/**
 * ✅ Estructura de los datos de una transferencia o depósito.
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
 * ✅ Datos requeridos para crear un depósito.
 */
interface DepositData {
    amount: number;
    dated: string;
    destination: string;
    origin: string;
}

/**
 * ✅ Crea un nuevo depósito asociado a la cuenta del usuario.
 * @param {number} accountId - ID de la cuenta asociada.
 * @param {string} token - Token de autenticación del usuario.
 * @param {DepositData} depositData - Datos del depósito.
 * @returns {Promise<Transaction>} - Respuesta del servidor con la información del depósito.
 */
export const createDeposit = async (
    accountId: number,
    token: string,
    depositData: DepositData
): Promise<Transaction> => {
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

        const data: Transaction = await response.json();
        console.log("Depósito realizado con éxito:", data);
        return data;
    } catch (error) {
        console.error("Error en createDeposit:", (error as Error).message || error);
        throw error;
    }
};

/**
 * ✅ Obtiene las transferencias relacionadas a una cuenta.
 * @param {number} accountId - ID de la cuenta.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Transaction[]>} - Array de transferencias.
 */
export const getTransferences = async (
    accountId: number,
    token: string
): Promise<Transaction[]> => {
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

        const data: any[] = await response.json(); // `data` es un array de objetos desconocidos

        // Validar y transformar los datos devueltos
        if (!Array.isArray(data)) {
            throw new Error("Datos inválidos: Se esperaba un array");
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

        console.log("Transferencias obtenidas y validadas:", validatedData);
        return validatedData;
    } catch (error) {
        console.error("Error en getTransferences:", (error as Error).message || error);
        throw error;
    }
};

/**
 * ✅ Realiza un pago a un servicio como una transferencia.
 * @param {number} accountId - ID de la cuenta del usuario.
 * @param {string} token - Token de autenticación.
 * @param {number} amount - Monto a pagar (negativo para débito).
 * @param {string} destination - Descripción del pago (Ej: "Pago de Netflix").
 * @param {string} origin - CVU del usuario.
 * @returns {Promise<Transaction>} - Datos de la transacción realizada.
 */
export const makePayment = async (
    accountId: number,
    token: string,
    amount: number,
    destination: string,
    origin: string
): Promise<Transaction> => {
    try {
        const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/transferences`, {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                dated: new Date().toISOString(),
                destination,
                origin,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al procesar el pago.");
        }

        const data: Transaction = await response.json();
        console.log("Pago realizado con éxito:", data);
        return data;
    } catch (error) {
        console.error("Error en makePayment:", (error as Error).message || error);
        throw error;
    }
};

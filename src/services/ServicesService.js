const API_BASE_URL = "https://digitalmoney.digitalhouse.com";

/**
 * Obtiene la lista de servicios disponibles para pagar.
 * @returns {Promise<Array<{ id: number, name: string, date: string }>>} - Lista de servicios
 */
export const getServices = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/service`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al obtener los servicios.");
        }

        const data = await response.json();

        // Validar la estructura y transformar si es necesario
        if (!Array.isArray(data)) {
            throw new Error("La respuesta del servidor no es válida. Se esperaba un array.");
        }

        return data.map((service) => ({
            id: service.id || 0,
            name: service.name || "Servicio desconocido",
            date: service.date || "Fecha no disponible",
        }));
    } catch (error) {
        console.error("Error en getServices:", error.message || error);
        throw error;
    }
};

/**
 * @typedef {Object} Service
 * @property {number} id
 * @property {string} name
 * @property {string} date
 * @property {number} invoice_value
 */
/**
 * Obtiene un servicio específico por su ID, obtenemos el valor del servicio.
 * @param {number} serviceId - ID del servicio.
 * @returns {Promise<object>} - Detalles del servicio.
 */
export const getServiceById = async (serviceId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/service/${serviceId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al obtener el servicio.");
        }

        /** @type {Service} */
        const data = await response.json(); // 🔥 Ahora TypeScript lo reconoce como `Service`

        return {
            id: data.id ?? 0,
            name: data.name ?? "Servicio desconocido",
            date: data.date ?? "",
            invoice_value: Number(data.invoice_value) ?? 0.0,
        };
    } catch (error) {
        console.error("Error en getServiceById:", error.message || error);
        throw error;
    }
};



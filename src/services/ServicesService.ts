const API_BASE_URL = "https://digitalmoney.digitalhouse.com";

/**
 * ✅ Interfaz que representa un servicio.
 */
interface Service {
    id: number;
    name: string;
    date: string;
    invoice_value?: number; // Opcional porque en `getServices` no se usa
}

/**
 * ✅ Obtiene la lista de servicios disponibles para pagar.
 * @returns {Promise<Service[]>} - Lista de servicios.
 */
export const getServices = async (): Promise<Service[]> => {
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

        const data: any[] = await response.json(); // `data` es un array de objetos desconocidos

        // Validar la estructura y transformar si es necesario
        if (!Array.isArray(data)) {
            throw new Error("La respuesta del servidor no es válida. Se esperaba un array.");
        }

        return data.map((service): Service => ({
            id: service.id ?? 0,
            name: service.name ?? "Servicio desconocido",
            date: service.date ?? "Fecha no disponible",
        }));
    } catch (error) {
        console.error("Error en getServices:", (error as Error).message || error);
        throw error;
    }
};

/**
 * ✅ Obtiene un servicio específico por su ID, incluyendo el valor de la factura.
 * @param {number} serviceId - ID del servicio.
 * @returns {Promise<Service>} - Detalles del servicio.
 */
export const getServiceById = async (serviceId: number): Promise<Service> => {
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

        const data: any = await response.json(); // `data` es un objeto desconocido

        return {
            id: data.id ?? 0,
            name: data.name ?? "Servicio desconocido",
            date: data.date ?? "",
            invoice_value: Number(data.invoice_value) ?? 0.0,
        };
    } catch (error) {
        console.error("Error en getServiceById:", (error as Error).message || error);
        throw error;
    }
};

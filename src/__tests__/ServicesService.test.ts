import { getServiceById } from "@/services/ServicesService";

global.fetch = jest.fn();

describe("ServicesService", () => {
    const mockService = {
        id: 1,
        name: "Netflix",
        date: "2024-01-30",
        invoice_value: 32.9,
    };

    test("Retorna el servicio correctamente", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockService,
        });

        const service = await getServiceById(1);
        expect(service).toEqual(mockService);
    });

    test("Lanza un error si la API responde con un error", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: "Error al obtener el servicio" }),
        });

        console.log("✅ [TEST] Simulación de error en getServiceById: Esto es esperado.");

        await expect(getServiceById(1)).rejects.toThrow(/Error al obtener el servicio/i);

    });
});

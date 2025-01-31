import { makePayment } from "@/services/TransferencesService";

global.fetch = jest.fn();

describe("TransferencesService", () => {
    const mockTransaction = {
        id: 1603,
        account_id: 602,
        type: "Transfer",
        description: "Transferiu para Pago de Netflix",
        origin: "485785153244782631",
        destination: "Pago de Netflix",
        amount: -33,
        dated: "2025-01-29T03:26:22.495Z",
    };

    test("Realiza un pago correctamente", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockTransaction,
        });
    
        const response = await makePayment(602, "fake-token", -33, "Pago de Netflix", "485785153244782631");
    
        expect(response).toEqual(mockTransaction);
        expect(fetch).toHaveBeenCalledWith(
            "https://digitalmoney.digitalhouse.com/api/accounts/602/transferences",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    Authorization: "fake-token",
                    "Content-Type": "application/json",
                }),
                body: expect.stringMatching(/"dated":".+?"/),  // 🔹 Verificamos que sea un string sin importar la fecha exacta
            })
        );
    });
    
    

    test("Lanza un error si la API responde con un error", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: "Error al realizar el pago" }),
        });

        console.log("✅ [TEST] Simulación de error en makePayment: Esto es esperado.");

        await expect(makePayment(602, "fake-token", -33, "Pago de Netflix", "485785153244782631")).rejects.toThrow(
            "Error al realizar el pago"
        );
    });
});

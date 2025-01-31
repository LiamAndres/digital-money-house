import { getAllTransactions } from "@/services/TransactionsService";

global.fetch = jest.fn();

describe("TransactionService", () => {
    const mockTransactions = [
        {
            id: 1,
            description: "Pago de Netflix",
            amount: -15.99,
            dated: "2024-01-30",
            account_id: 0,
            destination: "",
            origin: "",
            type: "Desconocido",
        },
        {
            id: 2,
            description: "Ingreso de dinero",
            amount: 200.0,
            dated: "2024-01-29",
            account_id: 0,
            destination: "",
            origin: "",
            type: "Desconocido",
        },
    ];

    test("Retorna las transacciones correctamente", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockTransactions,
        });

        const transactions = await getAllTransactions(123, "fake-token");
        expect(transactions).toEqual(mockTransactions);
    });

    test("Lanza un error si la API responde con un error", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: "Error al obtener transacciones" }),
        });

        console.log("✅ [TEST] Simulación de error en getAllTransactions: Esto es esperado.");

        await expect(getAllTransactions(123, "fake-token")).rejects.toThrow(
            "Error al obtener transacciones"
        );
    });
});

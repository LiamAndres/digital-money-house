import { useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function IngresarMonto() {
    const router = useRouter();
    const { cardId, cardNumber } = router.query; // Obtenemos la tarjeta seleccionada de los query params
    const [amount, setAmount] = useState(""); // Estado para manejar el monto ingresado

    // Validación para habilitar el botón solo si el monto es válido
    const isAmountValid = parseFloat(amount) > 0;

    const handleContinue = () => {
        if (!isAmountValid) return;

        // Redirigir a ConfirmarMonto con el monto y los datos de la tarjeta seleccionada en la query
        router.push({
            pathname: "/cargar-dinero/confirmar-monto",
            query: {
                amount,
                cardId,
                cardNumber, // Pasamos también el número de la tarjeta
            },
        });
    };

    return (
        <Layout>
            {/* Contenedor principal */}
            <div className="p-6 space-y-6">
                {/* Sección principal */}
                <section className="bg-darkCustom text-white rounded-lg p-6 flex flex-col justify-between">
                    {/* Título */}
                    <h2 className="text-greenCustom font-bold text-lg mb-6">
                        ¿Cuánto querés ingresar a la cuenta?
                    </h2>

                    {/* Input del monto */}
                    <input
                        type="number"
                        placeholder="$0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-white text-darkCustom rounded-md border border-gray-300 px-4 py-2 w-1/3 text-lg focus:outline-none focus:ring-2 focus:ring-greenCustom mb-6"
                    />

                    {/* Botón Continuar */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleContinue}
                            disabled={!isAmountValid}
                            className={`py-2 px-6 rounded-md font-bold ${isAmountValid
                                    ? "bg-greenCustom text-darkCustom hover:bg-opacity-90"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Continuar
                        </button>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

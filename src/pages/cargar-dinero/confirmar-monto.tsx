import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { createDeposit } from "@/services/TransferencesService";

// Tipo para la respuesta del depósito
interface DepositResponse {
    amount: number;
    dated: string;
    destination: string;
    origin: string;
}

export default function ConfirmarMonto() {
    const router = useRouter();
    const { amount, cardNumber } = router.query; // Obtenemos el monto y número de la tarjeta desde la query
    const { token, userData } = useAuth();

    const handleContinue = async () => {
        if (!userData?.id || !token || !amount || !cardNumber) {
            alert("Faltan datos para procesar la transacción. Por favor, revisa tu sesión.");
            return;
        }

        try {
            // Datos para el depósito
            const depositData = {
                amount: parseFloat(amount as string), // Monto positivo para depositar
                dated: new Date().toISOString(),    // Fecha actual en formato ISO
                destination: userData.cvu,          // CVU de la cuenta destino
                origin: cardNumber as string,       // Número de tarjeta como origen
            };

            // Realizar el depósito
            const response: DepositResponse = await createDeposit(userData.id, token, depositData)as DepositResponse;

            // Redirigir a DineroCargado con los datos del depósito
            router.push({
                pathname: "/cargar-dinero/dinero-cargado",
                query: {
                    amount: response.amount,
                    dated: response.dated,
                    destination: response.destination,
                    origin: response.origin,
                },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            console.error("Error en el depósito:", errorMessage);
            alert("Hubo un error al procesar el depósito. Inténtalo nuevamente.");
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-6">
                <section className="bg-darkCustom text-white rounded-lg p-6 flex flex-col justify-between mx-auto">
                    <h2 className="text-greenCustom font-bold text-lg mb-6">
                        Revisá que está todo bien
                    </h2>
                    <div className="space-y-4 mb-6">
                        <div className="space-y-1">
                            <p className="text-lg">Vas a transferir</p>
                            <p className="text-2xl font-bold">${amount || "0"}</p>
                        </div>
                        <hr className="border-gray-600" />
                        <div>
                            <p className="text-lg">Para</p>
                            <p className="font-bold">Cuenta propia</p>
                            <p className="text-gray-300 text-sm">Brubank</p>
                            <p className="text-gray-300 text-sm">CVU {userData?.cvu}</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleContinue}
                            className="bg-greenCustom text-darkCustom font-bold py-2 px-6 rounded-md hover:bg-opacity-90"
                        >
                            Continuar
                        </button>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

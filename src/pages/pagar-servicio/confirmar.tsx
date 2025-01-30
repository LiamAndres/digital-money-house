import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { getServiceById } from "@/services/ServicesService";
import { makePayment } from "@/services/TransferencesService";

interface Service {
    id: number;
    name: string;
    date: string;
    invoice_value: number;
}

export default function ConfirmarPago() {
    const { userData, token } = useAuth();
    const router = useRouter();
    const { id } = router.query;
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchService = async () => {
            if (!id) return;
            try {
                const data = await getServiceById(Number(id));
                setService(data as Service);
            } catch (error) {
                console.error("Error obteniendo el servicio:", error);
                setError("No se pudo cargar la información del servicio.");
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    const handleConfirmarPago = async () => {
        if (!service || !userData || !token) return;

        try {
            const transaction = (await makePayment(
                userData.id,
                token,
                -service.invoice_value,
                `Pago de ${service.name}`,
                userData.cvu
            )) as { id: number; amount: number; dated: string };

            router.push(
                `/pagar-servicio/realizado?id=${transaction.id}&amount=${transaction.amount}&service=${service.name}&date=${transaction.dated}`
            );
        } catch (error) {
            alert("Hubo un problema al procesar el pago. Intenta de nuevo.");
        }
    };

    return (
        <Layout>
            <div className="p-6 pt-10 flex justify-center">
                <section className="bg-darkCustom text-white rounded-lg p-6 space-y-6 w-full max-w-lg">
                    {loading ? (
                        <p className="text-center">Cargando información del servicio...</p>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : service ? (
                        <>
                            <h2 className="text-lg font-bold text-greenCustom">{service.name}</h2>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-lg">Total a pagar</p>
                                <p className="text-3xl font-bold text-greenCustom">
                                    ${service.invoice_value.toFixed(2)}
                                </p>
                            </div>

                            <button
                                onClick={handleConfirmarPago}
                                className="bg-greenCustom text-darkCustom font-bold py-3 px-6 rounded-lg w-full hover:bg-opacity-90 transition"
                            >
                                Confirmar pago
                            </button>
                        </>
                    ) : (
                        <p className="text-center text-red-500">Error al cargar el servicio.</p>
                    )}
                </section>
            </div>
        </Layout>
    );
}

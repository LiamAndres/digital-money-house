import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function DineroCargado() {
    const router = useRouter();
    const { amount, dated, destination, origin } = router.query; // Obtenemos los datos de la query string

    const handleGoHome = () => {
        router.push("/inicio"); // Redirige al inicio
    };

    const handleDownloadReceipt = () => {
        alert("Función para descargar comprobante no implementada aún.");
    };

    if (!amount || !dated || !destination || !origin) {
        return (
            <Layout>
                <div className="p-6">
                    <section className="bg-red-100 text-red-700 rounded-lg p-6 text-center">
                        <p>Hubo un problema al cargar los datos de la transacción.</p>
                        <button
                            onClick={handleGoHome}
                            className="mt-4 bg-gray-300 text-darkCustom font-bold py-2 px-6 rounded-md hover:bg-gray-400"
                        >
                            Ir al inicio
                        </button>
                    </section>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 pt-10 space-y-6">
                {/* Card principal */}
                <section className="bg-darkCustom text-white rounded-lg p-6 flex flex-col justify-between mx-auto space-y-6">
                    {/* Mensaje superior */}
                    <div className="bg-greenCustom text-darkCustom rounded-lg p-4 flex items-center gap-4">
                        <img
                            src="/images/icon-monto-check.png"
                            alt="Check"
                            className="h-8 w-8"
                        />
                        <h2 className="font-bold text-lg">Ya cargamos el dinero en tu cuenta</h2>
                    </div>

                    {/* Información del monto y detalles */}
                    <div className="space-y-4">
                        <p className="text-sm text-gray-400">
                            {new Date(dated as string).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                            })}
                        </p>
                        <div className="space-y-1">
                            <p className="text-lg">Monto transferido</p>
                            <p className="text-3xl font-bold">${amount}</p>
                        </div>
                        <hr className="border-gray-600" />
                        <div>
                            <p className="text-lg">Para</p>
                            <p className="font-bold">Cuenta propia</p>
                            <p className="text-gray-300 text-sm">CVU {destination}</p>
                            <p className="text-gray-300 text-sm">Tarjeta {origin}</p>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handleGoHome}
                            className="bg-gray-300 text-darkCustom font-bold py-2 px-6 rounded-md hover:bg-gray-400"
                        >
                            Ir al inicio
                        </button>
                        <button
                            onClick={handleDownloadReceipt}
                            className="bg-greenCustom text-darkCustom font-bold py-2 px-6 rounded-md hover:bg-opacity-90"
                        >
                            Descargar comprobante
                        </button>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

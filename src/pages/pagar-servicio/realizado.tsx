import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function PagoRealizado() {
    const router = useRouter();
    const { id, amount, service, date } = router.query;

    return (
        <Layout>
            <div className="p-6 pt-10 flex justify-center">
                <section className="bg-darkCustom text-white rounded-lg p-6 space-y-6 w-full max-w-lg">
                    <div className="bg-greenCustom text-darkCustom rounded-lg p-4 flex items-center gap-4">
                        <img src="/images/icon-monto-check.png" alt="Check" className="h-8 w-8" />
                        <h2 className="font-bold text-lg">Pago realizado con éxito</h2>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm text-gray-400">
                            Pago realizado el{" "}
                            {new Date(date as string).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                            })}
                        </p>
                        <div className="space-y-1">
                            <p className="text-lg">{service}</p>
                            <p className="text-3xl font-bold text-greenCustom">
                                ${Number(amount).toFixed(2)}
                            </p>
                        </div>
                        <hr className="border-gray-600" />
                        <div>
                            <p className="text-sm text-gray-400">Número de operación</p>
                            <p className="text-greenCustom font-bold">{id}</p>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => router.push("/inicio")}
                            className="bg-gray-300 text-darkCustom font-bold py-2 px-6 rounded-md hover:bg-gray-400"
                        >
                            Ir al inicio
                        </button>
                        <button
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

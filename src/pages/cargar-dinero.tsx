import Link from "next/link";
import Layout from "@/components/Layout";

export default function CargarDinero() {
    return (
        <Layout>
            <div className="bg-EEEAEA min-h-screen flex flex-col gap-6 px-4 md:px-8 pt-6">
                {/* Bloque Transferencia bancaria */}
                <Link
                    href="/cargar-dinero/transferencia"
                    className="bg-darkCustom text-white rounded-lg shadow-lg p-6 flex justify-between items-center hover:opacity-90"
                >
                    <div className="flex items-center gap-4">
                        <img
                            src="/images/icon-user.png"
                            alt="Transferencia bancaria"
                            className="h-8 w-8"
                        />
                        <span className="text-greenCustom font-bold text-lg">Transferencia bancaria</span>
                    </div>
                    <img
                        src="/images/flecha-continuar.png"
                        alt="Ir a transferencia bancaria"
                        className="h-6 w-6"
                    />
                </Link>

                {/* Bloque Seleccionar tarjeta */}
                <Link
                    href="/cargar-dinero/tarjetas"
                    className="bg-darkCustom text-white rounded-lg shadow-lg p-6 flex justify-between items-center hover:opacity-90"
                >
                    <div className="flex items-center gap-4">
                        <img
                            src="/images/icon-card.png"
                            alt="Seleccionar tarjeta"
                            className="h-8 w-8"
                        />
                        <span className="text-greenCustom font-bold text-lg">Seleccionar tarjeta</span>
                    </div>
                    <img
                        src="/images/flecha-continuar.png"
                        alt="Ir a seleccionar tarjeta"
                        className="h-6 w-6"
                    />
                </Link>
            </div>
        </Layout>
    );
}

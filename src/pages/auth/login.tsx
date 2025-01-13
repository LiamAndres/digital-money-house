import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [step, setStep] = useState(1); // Controla el paso actual (1: correo, 2: contraseña)

    return (
        <div className="bg-darkCustom min-h-screen flex flex-col">
            {/* Navbar */}
            <div className="bg-greenCustom p-4 flex justify-between items-center">
                <img src="/images/Logo-black.png" alt="Logo" className="h-8" />
            </div>

            {/* Contenido */}
            <div className="flex-grow flex flex-col justify-center items-center px-4">
                {step === 1 ? (
                    <div className="w-full max-w-md">
                        <h1 className="text-white text-xl font-bold text-center mb-6">¡Hola! Ingresá tu e-mail</h1>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="input-field"
                        />
                        <button
                            className="btn-green mt-4"
                            onClick={() => setStep(2)} // Cambia al paso de ingresar contraseña
                        >
                            Continuar
                        </button>
                        <Link href="/auth/register">
                            <button className="btn-gray mt-2">Crear cuenta</button>
                        </Link>
                    </div>
                ) : (
                    <div className="w-full max-w-md">
                        <h1 className="text-white text-xl font-bold text-center mb-6">Ingresá tu contraseña</h1>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="input-field"
                        />
                        <button className="btn-green mt-4">Ingresar</button>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar() {
    const { isAuthenticated, userData } = useAuth();

    console.log("Renderizando Navbar:", { isAuthenticated, userData });

    // Datos quemados por ahora (serán reemplazados con datos reales del endpoint)
    /* const mockUserData = {
        firstname: "Mauricio",
        lastname: "Brito",
    }; */

    const getInitials = (firstName: string, lastName: string) => {
        const initials = `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
        return initials.toUpperCase();
    };

    return (
        <nav className="bg-darkCustom text-white p-4 flex justify-between items-center">
            {/* Logo */}
            <div>
                <img
                    src="/images/logo.png"
                    alt="Digital Money House Logo"
                    className="h-10"
                />
            </div>

            {/* Bloque del usuario autenticado (Mock) */}
            {isAuthenticated && userData && (
                <Link
                    href="/inicio"
                    className="flex items-center gap-4 hover:opacity-90"
                    title="Ir a Inicio"
                >
                    <div className="bg-greenCustom text-darkCustom font-bold rounded-full w-10 h-10 flex items-center justify-center">
                    {getInitials(userData.firstname, userData.lastname)}
                    </div>
                    <span className="font-medium">
                        Hola, {userData.firstname} {userData.lastname}
                    </span>
                </Link>
            )}

            {/* Botones de autenticación si no está autenticado */}
            {!isAuthenticated && (
                <div>
                    <Link
                        href="/auth/login"
                        className="mr-4 text-greenCustom border border-greenCustom px-4 py-2 rounded-md hover:bg-greenCustom hover:text-black"
                    >
                        Ingresar
                    </Link>
                    <Link
                        href="/auth/register"
                        className="bg-greenCustom text-black px-4 py-2 rounded-md hover:opacity-90"
                    >
                        Crear cuenta
                    </Link>
                </div>
            )}
        </nav>
    );
}

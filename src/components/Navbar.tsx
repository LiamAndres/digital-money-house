//  Componente para la navegación superior
import { useAuth } from "@/context/AuthContext"; // Importamos el contexto de autenticación
export default function Navbar() {
    const { isAuthenticated } = useAuth(); // Obtenemos el estado de autenticación
    return (
        <nav className="bg-darkCustom text-white p-4 flex justify-between items-center">
            {/* Logo */}
            <div>
                <img
                    src="/images/logo.png"
                    alt="Digital Money House Logo"
                    className="h-10" // Ajusta la altura del logo
                />
            </div>

            {/* Botones (solo se muestran si no está autenticado) */}
            {!isAuthenticated && (
                <div>
                    <a
                        href="/auth/login"
                        className="mr-4 text-greenCustom border border-greenCustom px-4 py-2 rounded-md hover:bg-greenCustom hover:text-black"
                    >
                        Ingresar
                    </a>
                    <a
                        href="/auth/register"
                        className="bg-greenCustom text-black px-4 py-2 rounded-md hover:opacity-90"
                    >
                        Crear cuenta
                    </a>
                </div>
            )}
        </nav>
    );
}


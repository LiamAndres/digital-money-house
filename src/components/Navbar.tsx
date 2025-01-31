import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
    const { isAuthenticated, userData } = useAuth();

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
    };

    return (
        <nav className="bg-darkCustom text-white p-4 flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
                <div>
                    <img
                        src="/images/logo.png"
                        alt="Digital Money House Logo"
                        className="h-10"
                    />
                </div>
            </Link>

            {/* Menú Hamburguesa en Mobile */}
            {isAuthenticated && userData && (
                <div className="flex items-center gap-4">
                    <div className="lg:hidden bg-greenCustom text-darkCustom font-bold rounded-full w-10 h-10 flex items-center justify-center">
                        {getInitials(userData.firstname, userData.lastname)}
                    </div>
                    <button onClick={onMenuClick} className="lg:hidden text-white text-2xl text-greenCustom">
                        <img
                            src="/images/icon-menu-mobile.png"
                            alt="Menú móvil"
                            className="w-8 h-8" // Ajusta el tamaño según necesites
                        />
                    </button>

                </div>
            )}

            {/* Bloque del usuario autenticado (Solo en Desktop) */}
            {isAuthenticated && userData && (
                <Link href="/inicio" className="hidden lg:flex items-center gap-4 hover:opacity-90">
                    <div className="bg-greenCustom text-darkCustom font-bold rounded-full w-10 h-10 flex items-center justify-center">
                        {getInitials(userData.firstname, userData.lastname)}
                    </div>
                    <span className="font-medium">Hola, {userData.firstname} {userData.lastname}</span>
                </Link>
            )}

            {/* Botones de autenticación si no está autenticado */}
            {!isAuthenticated && (
                <div>
                    <Link href="/auth/login" className="mr-4 text-greenCustom border border-greenCustom px-4 py-2 rounded-md hover:bg-greenCustom hover:text-black">
                        Ingresar
                    </Link>
                    <Link href="/auth/register" className="bg-greenCustom text-black px-4 py-2 rounded-md hover:opacity-90">
                        Crear cuenta
                    </Link>
                </div>
            )}
        </nav>
    );
}

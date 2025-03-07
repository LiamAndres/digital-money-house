import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface NavbarProps {
    onMenuClick?: () => void; // ✅ Hacerlo opcional con "?"
}

export default function Navbar({ onMenuClick = () => {} }: NavbarProps) {
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
                        src="/images/logo-dmh.png"
                        alt="Digital Money House Logo"
                        className="h-auto w-auto max-w-[160px] sm:max-w-[180px] lg:max-w-[200px] object-contain"
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
                <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-end">
                    <Link
                        href="/auth/login"
                        className="text-greenCustom border border-greenCustom px-3 sm:px-4 py-2 rounded-md hover:bg-greenCustom hover:text-black 
            text-sm sm:text-base text-center"
                    >
                        Ingresar
                    </Link>
                    <Link
                        href="/auth/register"
                        className="bg-greenCustom text-black px-3 sm:px-4 py-2 rounded-md hover:opacity-90 
            text-sm sm:text-base text-center"
                    >
                        Crear cuenta
                    </Link>
                </div>
            )}
        </nav>
    );
}

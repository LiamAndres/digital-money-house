import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const router = useRouter();
    const { logout, userData } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <>
            {/* Sidebar en Desktop (Siempre visible en lg) */}
            <nav className="hidden lg:flex bg-greenCustom flex-col w-64 text-black p-6">
                <ul className="space-y-4">
                    <li className="hover:bg-gray-100 rounded-md transition-all duration-200 active:scale-95">
                        <Link href="/inicio" className="block text-black p-2 w-full h-full">
                            Inicio
                        </Link>
                    </li>
                    <li className="hover:bg-gray-100 rounded-md transition-all duration-200 active:scale-95">
                        <Link href="/actividad" className="block text-black p-2 w-full h-full">
                            Actividad
                        </Link>
                    </li>
                    <li className="hover:bg-gray-100 rounded-md transition-all duration-200 active:scale-95">
                        <Link href="/perfil" className="block text-black p-2 w-full h-full">
                            Tu perfil
                        </Link>
                    </li>
                    <li className="hover:bg-gray-100 rounded-md transition-all duration-200 active:scale-95">
                        <Link href="/cargar-dinero" className="block text-black p-2 w-full h-full">
                            Cargar dinero
                        </Link>
                    </li>
                    <li className="hover:bg-gray-100 rounded-md transition-all duration-200 active:scale-95">
                        <Link href="/pagar-servicios" className="block text-black p-2 w-full h-full">
                            Pagar servicios
                        </Link>
                    </li>
                    <li className="hover:bg-gray-100 rounded-md transition-all duration-200 active:scale-95">
                        <Link href="/tarjetas" className="block text-black p-2 w-full h-full">
                            Tarjetas
                        </Link>
                    </li>
                    <li className="hover:bg-gray-100 rounded-md transition-all duration-200 active:scale-95">
                        <button
                            onClick={handleLogout}
                            className="block text-red-600 p-2 w-full h-full text-left"
                        >
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Sidebar en Mobile (Solo visible si isOpen === true) */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={onClose}
            >
                <div
                    className={`bg-greenCustom w-full h-full flex flex-col transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
                >
                    {/* ✅ Cabecera del Sidebar */}
                    <div className="bg-darkCustom text-greenCustom p-6 flex justify-between items-center">
                        <span className="font-bold">
                            Hola, {userData?.firstname} {userData?.lastname}
                        </span>
                        <button onClick={onClose} className="text-greenCustom text-2xl">
                            ✕
                        </button>
                    </div>

                    {/* ✅ Lista de navegación */}
                    <ul className="flex-grow space-y-4 p-6">
                        <li className="hover:bg-grayCustom rounded-md transition-all duration-200 active:scale-95">
                            <Link href="/inicio" className="block text-black p-2 w-full h-full">
                                Inicio
                            </Link>
                        </li>
                        <li className="hover:bg-grayCustom rounded-md transition-all duration-200 active:scale-95">
                            <Link href="/actividad" className="block text-black p-2 w-full h-full">
                                Actividad
                            </Link>
                        </li>
                        <li className="hover:bg-grayCustom rounded-md transition-all duration-200 active:scale-95">
                            <Link href="/perfil" className="block text-black p-2 w-full h-full">
                                Tu perfil
                            </Link>
                        </li>
                        <li className="hover:bg-grayCustom rounded-md transition-all duration-200 active:scale-95">
                            <Link href="/cargar-dinero" className="block text-black p-2 w-full h-full">
                                Cargar dinero
                            </Link>
                        </li>
                        <li className="hover:bg-grayCustom rounded-md transition-all duration-200 active:scale-95">
                            <Link href="/pagar-servicios" className="block text-black p-2 w-full h-full">
                                Pagar servicios
                            </Link>
                        </li>
                        <li className="hover:bg-grayCustom rounded-md transition-all duration-200 active:scale-95">
                            <Link href="/tarjetas" className="block text-black p-2 w-full h-full">
                                Tarjetas
                            </Link>
                        </li>
                        <li className="hover:bg-grayCustom rounded-md transition-all duration-200 active:scale-95">
                            <button
                                onClick={handleLogout}
                                className="block text-red-600 p-2 w-full h-full text-left"
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

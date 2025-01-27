import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext"; // Importar el contexto de autenticación
import Link from "next/link";

export default function Sidebar() {
    const router = useRouter();
    const { logout } = useAuth(); // Usar la función de logout del contexto

    const handleLogout = () => {
        logout(); // Llama al método logout del contexto para actualizar el estado
        // Redirigir a la página promocional
        router.push("/");
    };

    return (
        <nav className="bg-greenCustom flex flex-col w-64 text-black">
            <ul className="flex-grow">
                <li className="p-4 hover:bg-gray-100 cursor-pointer">
                    <Link href="/inicio" className="block px-4">
                        Inicio
                    </Link>
                </li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">
                    <Link href="/actividad" className="block px-4">
                        Actividad
                    </Link>
                </li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">
                    <Link href="/perfil" className="block px-4">
                        Tu perfil
                    </Link>
                </li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">
                    <Link href="/cargar-dinero" className="block px-4">
                        Cargar dinero
                    </Link>
                </li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">
                    <Link href="/inicio" className="block px-4">
                        Pagar servicios
                    </Link>
                </li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">
                    <Link href="/tarjetas" className="block px-4">
                        Tarjetas
                    </Link>
                </li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">
                    <button
                        onClick={handleLogout}
                        className="px-4"
                    >
                        Cerrar sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
}

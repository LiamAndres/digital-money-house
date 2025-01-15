import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext"; // Importar el contexto de autenticación

export default function Sidebar() {
    const router = useRouter();
    const { logout } = useAuth(); // Usar la función de logout del contexto

    const handleLogout = () => {
        /* // Eliminar el token del localStorage
        localStorage.removeItem("token"); */
        logout(); // Llama al método logout del contexto para actualizar el estado
        // Redirigir a la página promocional
        router.push("/");
    };

    return (
        <nav className="bg-greenCustom flex flex-col w-64 text-black">
            <ul className="flex-grow">
                <li className="p-4 hover:bg-gray-100 cursor-pointer">Inicio</li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">Actividad</li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">Tu perfil</li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">Cargar dinero</li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">Pagar servicios</li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">Tarjetas</li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer">
                    <button
                        onClick={handleLogout}
                        className=""
                    >
                        Cerrar sesión
                    </button>
                </li>
            </ul>
            {/* <button
                onClick={handleLogout}
                className="p-4 bg-red-500 text-white font-bold hover:bg-red-400"
            >
                Cerrar sesión
            </button> */}
        </nav>
    );
}

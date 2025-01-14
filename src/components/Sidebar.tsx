import { useRouter } from "next/router";

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = () => {
        // Eliminar el token del localStorage
        localStorage.removeItem("token");
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

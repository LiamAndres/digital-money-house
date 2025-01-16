import { useState } from "react";
import Layout from "@/components/Layout";

export default function Perfil() {
    const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos en modo edición
    const [profileData, setProfileData] = useState({
        email: "mauriciobrito@digitalhouse.com",
        firstname: "Mauricio",
        lastname: "Brito",
        dni: "20350269798",
        phone: "1146730989",
        password: "******",
    });

    const handleInputChange = (field: string, value: string) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
    };

    const handleEditClick = () => {
        setIsEditing(true); // Activar modo edición
    };

    const handleSaveClick = () => {
        // Aquí se realizaría la conexión al endpoint para guardar los datos
        console.log("Datos guardados:", profileData);
        setIsEditing(false); // Desactivar modo edición
    };

    return (
        <Layout>
            <div className="bg-EEEAEA min-h-screen flex flex-col gap-6 px-4 md:px-8">
                {/* Bloque 1: Tus datos */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
                    <h2 className="text-darkCustom font-bold text-lg mb-4">Tus datos</h2>
                    <ul className="space-y-4">
                        {[
                            { label: "Email", field: "email", value: profileData.email },
                            { label: "Nombre", field: "firstname", value: profileData.firstname },
                            { label: "Apellido", field: "lastname", value: profileData.lastname },
                            { label: "CUIT", field: "dni", value: profileData.dni },
                            { label: "Teléfono", field: "phone", value: profileData.phone },
                            { label: "Contraseña", field: "password", value: profileData.password },
                        ].map((item) => (
                            <li
                                key={item.field}
                                className="flex flex-col md:flex-row md:justify-between md:items-center gap-2"
                            >
                                <label
                                    htmlFor={item.field}
                                    className="text-darkCustom font-medium md:w-1/3"
                                >
                                    {item.label}
                                </label>
                                <input
                                    id={item.field}
                                    type={item.field === "password" ? "password" : "text"}
                                    value={item.value}
                                    onChange={(e) => handleInputChange(item.field, e.target.value)}
                                    disabled={!isEditing} // Solo editable en modo edición
                                    className={`border border-gray-300 rounded-md px-2 py-1 w-full md:w-2/3 bg-gray-100 focus:bg-white focus:outline-none ${!isEditing && "text-gray-500"
                                        }`}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex justify-end gap-4">
                        {!isEditing ? (
                            <button
                                onClick={handleEditClick}
                                className="bg-greenCustom text-darkCustom font-bold py-2 px-4 rounded-md hover:bg-opacity-90"
                            >
                                Editar
                            </button>
                        ) : (
                            <button
                                onClick={handleSaveClick}
                                className="bg-greenCustom text-darkCustom font-bold py-2 px-4 rounded-md hover:bg-opacity-90"
                            >
                                Guardar
                            </button>
                        )}
                    </div>
                </div>

                {/* Bloque 2: Gestioná los medios de pago */}
                <div className="w-full max-w-4xl mx-auto">
                    <a
                        href="/tarjetas"
                        className="bg-greenCustom text-darkCustom font-bold py-4 px-6 block text-center rounded-lg hover:bg-opacity-90 shadow-lg"
                    >
                        Gestioná los medios de pago
                    </a>
                </div>

                {/* Bloque 3: Copia CVU y Alias */}
                <div className="bg-darkCustom text-white rounded-lg p-6 shadow-lg w-full max-w-4xl mx-auto">
                    <h2 className="text-lg font-bold mb-4">
                        Copia tu CVU o alias para ingresar o transferir dinero desde otra cuenta
                    </h2>
                    <ul className="space-y-4">
                        {[
                            { label: "CVU", value: "0000002100075320000000" },
                            { label: "Alias", value: "estealiasnoexiste" },
                        ].map((item) => (
                            <li key={item.label} className="flex justify-between items-center">
                                <div className="flex-1">
                                    <p className="font-bold">{item.label}</p>
                                    <p
                                        className="text-gray-300 text-sm md:text-base lg:text-lg overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={item.value} // Mostrar el texto completo al pasar el ratón
                                    >
                                        {item.value}
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigator.clipboard.writeText(item.value)} // Copiar texto al portapapeles
                                    className="text-darkCustom p-2 rounded-full hover:bg-opacity-90"
                                >
                                    <img
                                        src="/images/icon-copiar.png"
                                        alt="Copiar"
                                        className="h-5 w-5" // Ajusta el tamaño del icono
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}

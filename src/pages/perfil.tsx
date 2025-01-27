import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { updateUser } from "@/services/UserService";
import CvuAliasBlock from "@/components/CvuAliasBlock";
import Link from "next/link";


interface ProfileData {
    email: string;
    firstname: string;
    lastname: string;
    dni: string;
    phone: string;
    password?: string;
}

export default function Perfil() {
    const { userData, token, setUserData } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [profileData, setProfileData] = useState<ProfileData>({
        email: userData?.email || "",
        firstname: userData?.firstname || "",
        lastname: userData?.lastname || "",
        dni: userData?.dni?.toString() || "",
        phone: userData?.phone || "",
        password: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
    };

    const handleEditClick = () => {
        setIsEditing(true); // Activar modo edición
        setProfileData((prev) => ({ ...prev, password: "" })); // Al entrar en modo edición, borrar el valor inicial del campo contraseña
    };

    const handleSaveClick = async () => {
        if (!token || !userData) return;

        try {
            setIsLoading(true); // Mostrar indicador de carga
            const { dni, password, ...updatableData } = profileData; // Excluir 'dni' del objeto enviado al backend

            const payload = password
                ? { ...updatableData, password } // Incluir contraseña si se modificó
                : updatableData; // Excluir contraseña si está vacía

            const updatedData = await updateUser(userData.user_id, token, payload);
            setUserData(updatedData); // Actualizar el contexto global con los nuevos datos
            setIsEditing(false); // Salir del modo edición
        } catch (error) {
            console.error("Error al actualizar datos:", (error as Error).message);
            alert("Hubo un error al actualizar tus datos. Por favor, intenta nuevamente.");
        } finally {
            setIsLoading(false); // Ocultar indicador de carga
        }
    };

    if (!userData) {
        return <div>Cargando datos...</div>; // Muestra un mensaje mientras se cargan los datos
    }

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
                                    placeholder={item.field === "password" && !isEditing ? "******" : ""}
                                    value={item.value}
                                    onChange={(e) => handleInputChange(item.field, e.target.value)}
                                    disabled={!isEditing && item.field !== "password"}
                                    className={
                                        `border border-gray-300 rounded-md px-2 py-1 w-full md:w-2/3
                                        ${!isEditing ? "bg-gray-100 text-gray-700" : "bg-white text-gray-900"}
                                        focus:outline-none`
                                    }
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
                                disabled={isLoading}
                            >
                                {isLoading ? "Guardando..." : "Guardar"}
                            </button>
                        )}
                    </div>
                </div>
                {/* Bloque 2: Gestioná los medios de pago */}
                <div className="w-full max-w-4xl mx-auto">
                    <Link
                        href="/tarjetas"
                        className="bg-greenCustom text-darkCustom font-bold py-4 px-6 block text-center rounded-lg hover:bg-opacity-90 shadow-lg"
                    >
                        Gestioná los medios de pago
                    </Link>
                </div>

                {/* Bloque 3: Copia CVU y Alias */}
                <CvuAliasBlock cvu={userData.cvu} alias={userData.alias} />
            </div>
        </Layout>
    );
}

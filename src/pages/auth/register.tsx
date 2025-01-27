import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { registerUser } from "@/services/api"; // Importamos la función
import { useAuth } from "@/context/AuthContext"
import Link from "next/link";



// Esquema de validación con Yup
const schema = yup.object().shape({
    nombre: yup.string().required("El nombre es obligatorio"),
    apellido: yup.string().required("El apellido es obligatorio"),
    dni: yup
        .string()
        .matches(/^[0-9]+$/, "El DNI debe contener solo números")
        .required("El DNI es obligatorio"),
    email: yup
        .string()
        .email("Debe ser un correo válido")
        .required("El correo electrónico es obligatorio"),
    password: yup
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(20, "La contraseña no puede tener más de 20 caracteres")
        .matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
            "Debe contener una mayúscula, un número y un carácter especial"
        )
        .required("La contraseña es obligatoria"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
        .required("Confirma tu contraseña"),
    telefono: yup
        .string()
        .matches(/^[0-9]+$/, "El teléfono debe contener solo números")
        .required("El teléfono es obligatorio"),
});

export default function Register() {

    const router = useRouter();
    const { isAuthenticated } = useAuth(); // Usamos el estado de autenticación del contexto

    // Redirige al inicio si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/inicio");
    }
  }, [isAuthenticated, router]);

    /* const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aquí va tu lógica de registro con la API.
        // Si el registro es exitoso, redirige al éxito.
        router.push("/auth/success");
    }; */

    // Configuración de React Hook Form con Yup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema), // Conecta las validaciones con React Hook Form
    });

    const onSubmit = async (data: any) => {
        try {
            // Reestructurar los datos para que coincidan con lo que el backend espera
            const formattedData = {
                dni: parseInt(data.dni, 10), // Convertir a número
                email: data.email,
                firstname: data.nombre, // Mapear "nombre" a "firstname"
                lastname: data.apellido, // Mapear "apellido" a "lastname"
                password: data.password,
                phone: data.telefono, // Mapear "telefono" a "phone"
            };

            const response = await registerUser(formattedData); // Llamamos a la API
            console.log("Registro exitoso:", response);
            router.push("/auth/success"); // Redirige a la pantalla de éxito
        } catch (error: any) {
            console.error("Error en el registro:", error.message);
            alert(error.message || "Error al registrar el usuario"); // Mostrar error al usuario
        }
    };


    return (
        <div className="bg-darkCustom min-h-screen flex flex-col">
            {/* Navbar */}
            <div className="bg-greenCustom p-4 flex justify-between items-center">
                <img src="/images/Logo-black.png" alt="Logo" className="h-8" />
                <Link
                    href="/auth/login"
                    className="bg-[#3A393E] text-white font-bold text-[14px] px-4 py-2 rounded-md hover:opacity-90"
                >
                    Iniciar sesión
                </Link>
            </div>

            {/* Formulario de registro */}
            <div className="flex-grow flex flex-col justify-center items-center px-6 md:px-4">
                <h1 className="text-white text-2xl font-bold mb-6">Crear cuenta</h1>
                <form
                    className="w-full max-w-4xl grid grid-cols-1 gap-4 md:grid-cols-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Contenedor del input Nombre */}
                    <div className="flex flex-col col-span-1">
                        <input
                            type="text"
                            placeholder="Nombre*"
                            {...register("nombre")}
                            className="input-field"
                        />
                        <p className="text-red-500 text-xs mt-1">{errors.nombre?.message}</p>
                    </div>

                    {/* Contenedor del input Apellido */}
                    <div className="flex flex-col col-span-1">
                        <input
                            type="text"
                            placeholder="Apellido*"
                            {...register("apellido")}
                            className="input-field"
                        />
                        <p className="text-red-500 text-xs mt-1">{errors.apellido?.message}</p>
                    </div>

                    {/* Contenedor del input DNI */}
                    <div className="flex flex-col col-span-1">
                        <input
                            type="text"
                            placeholder="DNI*"
                            {...register("dni")}
                            className="input-field"
                        />
                        <p className="text-red-500 text-xs mt-1">{errors.dni?.message}</p>
                    </div>

                    {/* Contenedor del input Correo electrónico */}
                    <div className="flex flex-col col-span-1">
                        <input
                            type="email"
                            placeholder="Correo electrónico*"
                            {...register("email")}
                            className="input-field"
                        />
                        <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
                    </div>

                    {/* Texto sobre contraseña */}
                    <p className="text-[11.2px] text-[#EEEAEA] md:col-span-2">
                        Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter especial, una mayúscula y un número).
                    </p>

                    {/* Contenedor del input Contraseña */}
                    <div className="flex flex-col col-span-1">
                        <input
                            type="password"
                            placeholder="Contraseña*"
                            {...register("password")}
                            className="input-field"
                        />
                        <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
                    </div>

                    {/* Contenedor del input Confirmar contraseña */}
                    <div className="flex flex-col col-span-1">
                        <input
                            type="password"
                            placeholder="Confirmar contraseña*"
                            {...register("confirmPassword")}
                            className="input-field"
                        />
                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword?.message}</p>
                    </div>

                    {/* Contenedor del input Teléfono */}
                    <div className="flex flex-col col-span-1">
                        <input
                            type="tel"
                            placeholder="Teléfono*"
                            {...register("telefono")}
                            className="input-field"
                        />
                        <p className="text-red-500 text-xs mt-1">{errors.telefono?.message}</p>
                    </div>

                    {/* Contenedor del botón */}
                    <div className="flex flex-col col-span-1">
                        <button type="submit" className="btn-green">
                            Crear cuenta
                        </button>
                        {/* Mensaje general de error */}
                        {Object.keys(errors).length > 0 && (
                            <p className="text-red-500 text-sm mt-2 text-center">
                                Completa los campos requeridos
                            </p>
                        )}
                    </div>
                </form>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}


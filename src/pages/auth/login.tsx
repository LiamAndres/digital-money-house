import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Esquema de validación para cada paso
const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .required("El correo electrónico es obligatorio"),
});

const passwordSchema = yup.object().shape({
  password: yup.string().required("La contraseña es obligatoria"),
});

export default function Login() {
  const [step, setStep] = useState(1); // Controla el paso actual (1: correo, 2: contraseña)

  // Formulario para el paso de email
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  // Formulario para el paso de contraseña
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const handleEmailStep = (data: any) => {
    console.log("Email válido:", data);
    setStep(2); // Avanza al siguiente paso
  };

  const handlePasswordStep = (data: any) => {
    console.log("Contraseña válida:", data);
    // Aquí iría la lógica para enviar las credenciales de inicio de sesión
    alert("Inicio de sesión exitoso");
  };

  return (
    <div className="bg-darkCustom min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="bg-greenCustom p-4 flex justify-between items-center">
        <img src="/images/Logo-black.png" alt="Logo" className="h-8" />
      </div>

      {/* Contenido */}
      <div className="flex-grow flex flex-col justify-center items-center px-4">
        {step === 1 ? (
          <div className="w-full max-w-md">
            <h1 className="text-white text-xl font-bold text-center mb-6">
              ¡Hola! Ingresá tu e-mail
            </h1>
            <form
              onSubmit={handleEmailSubmit(handleEmailStep)}
              className="flex flex-col gap-2"
            >
              {/* Input de correo */}
              <input
                type="email"
                placeholder="Correo electrónico"
                {...registerEmail("email")}
                className="input-field"
              />
              <p className="text-red-500 text-xs">{emailErrors.email?.message}</p>

              <button type="submit" className="btn-green mt-4">
                Continuar
              </button>
            </form>
            <Link href="/auth/register">
              <button className="btn-gray mt-4">Crear cuenta</button>
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <h1 className="text-white text-xl font-bold text-center mb-6">
              Ingresá tu contraseña
            </h1>
            <form
              onSubmit={handlePasswordSubmit(handlePasswordStep)}
              className="flex flex-col gap-2"
            >
              {/* Input de contraseña */}
              <input
                type="password"
                placeholder="Contraseña"
                {...registerPassword("password")}
                className="input-field"
              />
              <p className="text-red-500 text-xs">{passwordErrors.password?.message}</p>

              <button type="submit" className="btn-green mt-4">
                Ingresar
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

/* import { loginUser } from "@/services/api"; */
import { loginUser } from "@/services/AuthService";
import { useAuth } from "@/context/AuthContext";

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
  const [email, setEmail] = useState(""); // Nuevo estado para el email
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/inicio"); // Redirige al dashboard si ya está logueado
    }
  }, [isAuthenticated, router]);

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
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const handleEmailStep = (data: any) => {
    setEmail(data.email); // Guardar el email en el estado

    resetPasswordForm(); // Limpia cualquier valor residual en el formulario de contraseña
    console.log("Formulario de contraseña reiniciado", data);
    setStep(2); // Avanza al siguiente paso
  };

  const { login } = useAuth();

  const handlePasswordStep = async (data: any) => {
    try {
      const credentials = {
        email: email, // Guardamos el email del primer paso
        password: data.password,
      };

      console.log("Enviando credenciales:", credentials);
      const result = await loginUser(credentials); // Llamamos al servicio de login
      console.log("Inicio de sesión exitoso:", result);

      // Usar el método login del AuthContext
      await login(result.token);

      // Redirigir al usuario a una pantalla principal o dashboard
      router.push("/inicio");
    } catch (error: any) {
      alert(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="bg-darkCustom min-h-screen flex flex-col">
      {/* Navbar */}
      <Link href="/">
        <div className="bg-greenCustom p-4 flex justify-between items-center">
          <img src="/images/Logo-black.png" alt="Logo" className="h-8" />
        </div>
      </Link>

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
              autoComplete="off"
            >
              {/* Input de correo */}
              <input
                type="email"
                placeholder="Correo electrónico"
                {...registerEmail("email")}
                className="input-field"
                autoComplete="email"
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
              key="password-step"
              onSubmit={handlePasswordSubmit(handlePasswordStep)}
              className="flex flex-col gap-2"
              autoComplete="off"
            >
              {/* Input de contraseña */}
              <input
                type="password"
                placeholder="Contraseña"
                {...registerPassword("password")}
                className="input-field"
                autoComplete="new-password"
                defaultValue=""
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

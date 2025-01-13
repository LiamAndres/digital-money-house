import Footer from "@/components/Footer";
import { useRouter } from "next/router";



export default function Register() {

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aquí va tu lógica de registro con la API.
        // Si el registro es exitoso, redirige al éxito.
        router.push("/auth/success");
    };


    return (
        <div className="bg-darkCustom min-h-screen flex flex-col">
            {/* Navbar */}
            <div className="bg-greenCustom p-4 flex justify-between items-center">
                <img src="/images/Logo-black.png" alt="Logo" className="h-8" />
                <a
                    href="/auth/login"
                    className="bg-[#3A393E] text-white font-bold text-[14px] px-4 py-2 rounded-md hover:opacity-90"
                >
                    Iniciar sesión
                </a>
            </div>

            {/* Formulario de registro */}
            <div className="flex-grow flex flex-col justify-center items-center px-6 md:px-4">
                <h1 className="text-white text-2xl font-bold mb-6">Crear cuenta</h1>
                <form className="w-full max-w-4xl grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
                    {/* Input Nombre */}
                    <input type="text" placeholder="Nombre*" className="input-field" />
                    {/* Input Apellido */}
                    <input type="text" placeholder="Apellido*" className="input-field" />
                    {/* Input DNI */}
                    <input type="text" placeholder="DNI*" className="input-field" />
                    {/* Input Correo electrónico */}
                    <input type="email" placeholder="Correo electrónico*" className="input-field" />
                    {/* Indicaciones sobre la contraseña */}
                    <p className="text-[11.2px] text-[#EEEAEA] md:col-span-2">
                        Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter especial, una mayúscula y un número).
                    </p>
                    {/* Input Contraseña */}
                    <input type="password" placeholder="Contraseña*" className="input-field" />
                    {/* Input Confirmar contraseña */}
                    <input type="password" placeholder="Confirmar contraseña*" className="input-field" />
                    {/* Input Teléfono */}
                    <input type="tel" placeholder="Teléfono*" className="input-field" />
                    {/* Botón Crear cuenta */}
                    <button type="submit" className="btn-green">Crear cuenta</button>
                </form>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}


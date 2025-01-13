import Link from "next/link";

export default function Success() {
    return (
        <div className="bg-darkCustom min-h-screen flex flex-col">
            {/* Navbar */}
            <div className="bg-greenCustom p-4 flex justify-start items-center">
                <img src="/images/Logo-black.png" alt="Logo" className="h-8" />
            </div>

            {/* Contenido */}
            <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-white text-2xl font-bold mb-4">Registro Exitoso</h1>
                <img
                    src="/images/Check.png"
                    alt="Check Icon"
                    className="h-20 w-20 mb-4"
                />
                <p className="text-[#EEEAEA] text-base max-w-md">
                    Hemos enviado un correo de confirmación para validar tu email, por favor revisalo para iniciar sesión.
                </p>
                <Link href="/auth/login">
                    <button className="btn-green mt-6 px-8 py-3 min-w-[200px] max-w-[300px] text-center">
                        Continuar
                    </button>
                </Link>
            </div>

            {/* Footer */}
            <footer className="bg-darkCustom text-greenCustom py-4 px-6 text-center md:text-start">
                <p>© 2022 Digital Money House</p>
            </footer>
        </div>
    );
}

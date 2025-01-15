import withAuth from "@/utils/withAuth";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

function Inicio() {
    return (
        <div className="bg-darkCustom min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Contenido principal con Sidebar y Dashboard */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <Sidebar />
                {/* Contenido */}
                <main className="flex-grow flex flex-col justify-center items-center px-4">
                    <h1 className="text-white text-3xl font-bold text-center mb-6">
                        Bienvenido a tu Dashboard
                    </h1>
                    <p className="text-greenCustom text-lg">
                        El inicio de sesión fue exitoso.
                    </p>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default withAuth(Inicio);

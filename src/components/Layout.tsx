import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="bg-grayCustom min-h-screen flex flex-col overflow-x-hidden">
            {/* Navbar con botón para abrir/cerrar Sidebar en mobile */}
            <Navbar onMenuClick={() => setSidebarOpen(true)} />

            <div className="flex flex-grow">
                {/* Sidebar en Desktop (siempre visible en lg) */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Contenido dinámico */}
                <main className="flex-grow flex flex-col gap-6 px-4 sm:px-6 lg:px-8 w-full">
                    {children} {/* Aquí se renderiza el contenido dinámico */}
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

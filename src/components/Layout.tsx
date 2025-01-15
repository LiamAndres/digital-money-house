import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-grayCustom min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Contenido principal con Sidebar y Dashboard */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <Sidebar />
                {/* Contenido dinámico */}
                <main className="flex-grow flex flex-col gap-6 px-8 py-6">
                    {children} {/* Aquí se renderiza el contenido dinámico */}
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

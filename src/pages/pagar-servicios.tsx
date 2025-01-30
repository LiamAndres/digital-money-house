import { useState, useEffect } from "react";
import { getServices } from "@/services/ServicesService";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

interface Service {
    id: number;
    name: string;
    date: string;
}

export default function PagarServicios() {
    const [services, setServices] = useState<Service[]>([]);
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
                setFilteredServices(data);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los servicios:", error);
                setError("Hubo un problema al cargar los servicios.");
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Filtrar servicios según el término de búsqueda
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredServices(services);
        } else {
            const filtered = services.filter((service) =>
                service.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredServices(filtered);
        }
    }, [searchTerm, services]);

    return (
        <Layout>
            <div className="p-6 space-y-6">
                {/* Buscador */}
                <section>
                    <input
                        type="text"
                        placeholder="Buscá entre más de 5.000 empresas"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-greenCustom"
                    />
                </section>

                {/* Lista de servicios */}
                <section className="bg-white rounded-lg shadow-lg p-4">
                    <h2 className="text-lg text-darkCustom font-bold mb-4">Más recientes</h2>

                    {loading ? (
                        <p className="text-gray-500">Cargando servicios...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : filteredServices.length === 0 ? (
                        <p className="text-gray-500">No se encontraron servicios.</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {filteredServices.map((service) => (
                                <li
                                    key={service.id}
                                    className="flex justify-between items-center py-3 px-4 cursor-pointer hover:bg-gray-100 rounded-lg transition-all"
                                >
                                    <p className="text-darkCustom font-semibold">{service.name}</p>
                                    <button
                                        onClick={() => {
                                            localStorage.setItem("selectedServiceId", service.id.toString()); // Guardamos el ID del servicio
                                            router.push(`/pagar-servicio/cvu`); // Redirigimos a la pantalla de ingreso del CVU
                                        }}
                                        className="text-greenCustom font-bold hover:underline"
                                    >
                                        Seleccionar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </Layout>
    );
}

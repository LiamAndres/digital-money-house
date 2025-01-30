import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { getServiceById } from "@/services/ServicesService";

interface Service {
  id: number;
  name: string;
  date: string;
  invoice_value: number;
}

export default function MediosDePago() {
  const { userData } = useAuth();
  const router = useRouter();
  const { id } = router.query; // ID del servicio
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
        if (!id) return;
        try {
            const data = await getServiceById(Number(id));
            setService(data as Service); // 🔥 Cast manual a `Service`
        } catch (error) {
            console.error("Error obteniendo el servicio:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchService();
}, [id]);

  const handlePagar = () => {
    if (!service || !userData) return;

    if (userData.available_amount >= service.invoice_value) {
      router.push(`/pagar-servicio/confirmar?id=${id}`);
    } else {
      alert("Saldo insuficiente. Debes cargar dinero antes de pagar.");
    }
  };

  return (
    <Layout>
      <div className="p-6 pt-10 flex justify-center">
        <section className="bg-darkCustom text-white rounded-lg p-6 space-y-6 w-full max-w-lg">
          {loading ? (
            <p className="text-center">Cargando información del servicio...</p>
          ) : service ? (
            <>
              <h2 className="text-lg font-bold text-greenCustom">{service.name}</h2>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg">Total a pagar</p>
                <p className="text-3xl font-bold text-greenCustom">${service.invoice_value.toFixed(2)}</p>
              </div>

              <button
                onClick={handlePagar}
                className="bg-greenCustom text-darkCustom font-bold py-3 px-6 rounded-lg w-full hover:bg-opacity-90 transition"
              >
                Pagar con saldo de cuenta
              </button>

              <p className="text-center text-sm text-gray-400">
                ¿No tienes saldo suficiente?
              </p>

              <button
                onClick={() => router.push("/cargar-dinero")}
                className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg w-full hover:bg-gray-600 transition"
              >
                Cargar dinero
              </button>
            </>
          ) : (
            <p className="text-center text-red-500">Error al cargar el servicio.</p>
          )}
        </section>
      </div>
    </Layout>
  );
}

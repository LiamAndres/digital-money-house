import Dashboard from "@/components/Dashboard";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/utils/withAuth";
import Link from "next/link";
import { useEffect } from "react";
import { getAccount } from "@/services/AccountService";

function Inicio() {
  const { token, userData, setUserData } = useAuth();

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!token) return;

      try {
        const accountData = await getAccount(token);
        setUserData((prevUserData) => {
          if (!prevUserData) return null; // Manejo de casos donde sea null
          return {
            ...prevUserData,
            available_amount: accountData.available_amount, // Actualizamos el dinero disponible
          };
        });
      } catch (error) {
        console.error("Error al obtener los datos de la cuenta:", error);
      }
    };

    fetchAccountData();
  }, [token, setUserData]);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Bloque 1: Tarjeta Dinero Disponible */}
        <section className="bg-darkCustom text-white rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-lg">Dinero disponible</p>
            <h2 className="text-4xl font-bold mt-2">
              ${userData?.available_amount.toLocaleString("es-ES") || "0"}
            </h2>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/tarjetas" className="text-greenCustom underline">Ver tarjetas</Link>
            <Link href="/cargar-dinero/transferencia" className="text-greenCustom underline">Ver CVU</Link>
          </div>
        </section>

        {/* Bloque 2: Botones principales */}
        <section className="flex flex-col md:flex-row justify-between gap-4">
          <button className="bg-greenCustom text-darkCustom font-bold py-3 rounded-lg w-full md:w-1/2">
            Cargar dinero
          </button>
          <button className="bg-greenCustom text-darkCustom font-bold py-3 rounded-lg w-full md:w-1/2">
            Pago de servicios
          </button>
        </section>

        {/* Bloque 3: Barra de búsqueda */}
        <section>
          <input
            type="text"
            placeholder="Buscar en tu actividad"
            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-greenCustom"
          />
        </section>

        {/* Bloque 4: Dashboard */}
        <section>
          <Dashboard
            limit={10}
            showViewAll={true}
            showPagination={false}
            title="Tu actividad"
          />
        </section>
      </div>
    </Layout>
  );
}

export default withAuth(Inicio);

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { getTransactionDetails } from "@/services/TransactionsService";
import { useAuth } from "@/context/AuthContext";

interface Transaction {
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination?: string;
  id: number;
  origin?: string;
  type: string;
}

export default function DetalleTransaccion() {
  const router = useRouter();
  const { token } = useAuth();
  const { id, accountId } = router.query;
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!token || !id || !accountId) {
        setError("No se pudo cargar la transacción.");
        setLoading(false);
        return;
      }

      try {
        const data = await getTransactionDetails(Number(accountId), Number(id), token);

        if (!data || typeof data !== "object" || !("id" in data) || !("amount" in data)) {
          throw new Error("Datos inválidos recibidos del servidor.");
        }

        // Forzamos el tipo como Transaction después de validar que tiene las propiedades esperadas
        setTransaction({
          account_id: (data as Transaction).account_id ?? 0,
          amount: (data as Transaction).amount ?? 0,
          dated: (data as Transaction).dated ?? "",
          description: (data as Transaction).description ?? "Sin descripción",
          destination: (data as Transaction).destination ?? "Destino desconocido",
          id: (data as Transaction).id,
          origin: (data as Transaction).origin ?? "Origen desconocido",
          type: (data as Transaction).type ?? "Desconocido",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles:", error);
        setError("No se pudo cargar la transacción.");
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id, accountId, token]);

  const handleGoHome = () => {
    router.push("/inicio");
  };

  if (loading) return <Layout><p>Cargando detalles...</p></Layout>;
  if (error) return <Layout><p className="text-red-500">{error}</p></Layout>;

  return (
    <Layout>
      <div className="p-6 pt-10 space-y-6">
        <section className="bg-darkCustom text-white rounded-lg p-6 flex flex-col justify-between mx-auto space-y-6">
          <div className="bg-greenCustom text-darkCustom rounded-lg p-4 flex items-center gap-4">
            <img src="/images/icon-monto-check.png" alt="Check" className="h-8 w-8" />
            <h2 className="font-bold text-lg">Aprobada</h2>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Creada el{" "}
              {new Date(transaction!.dated).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <div className="space-y-1">
              <p className="text-lg">Transferencia de dinero</p>
              <p className="text-3xl font-bold text-greenCustom">
                ${Math.abs(transaction!.amount).toLocaleString("es-ES")}
              </p>
            </div>
            <hr className="border-gray-600" />
            <div>
              <p className="text-lg">Le transferiste a</p>
              <p className="font-bold text-greenCustom">
                {transaction!.destination}
              </p>
              <p className="text-sm text-gray-400">Número de operación</p>
              <p className="text-greenCustom font-bold">{transaction!.id}</p>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleGoHome}
              className="bg-gray-300 text-darkCustom font-bold py-2 px-6 rounded-md hover:bg-gray-400"
            >
              Ir al inicio
            </button>
            <button
              className="bg-greenCustom text-darkCustom font-bold py-2 px-6 rounded-md hover:bg-opacity-90"
            >
              Descargar comprobante
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}

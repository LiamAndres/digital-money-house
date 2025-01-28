import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getAllTransactions } from "@/services/TransactionsService"; // Cambiamos al nuevo servicio

interface Transaction {
  account_id: number;
  amount: number;
  dated: string;
  description: string;
  destination: string;
  id: number;
  origin: string;
  type: string;
}

interface DashboardProps {
  limit?: number;              // Límite de transacciones a mostrar
  showPagination?: boolean;    // Si muestra o no paginación
  showViewAll?: boolean;       // Si muestra o no el enlace "Ver toda tu actividad"
  title: string;               // Título del dashboard
}

const Dashboard: React.FC<DashboardProps> = ({ limit, showPagination, showViewAll, title }) => {
  const { token, userData } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      console.log("Token:", token, "Account ID:", userData?.id);
      if (!token || !userData?.id) {
        setError("No se pudo cargar la actividad. Inicia sesión nuevamente.");
        setLoading(false);
        return;
      }

      try {
        const data = await getAllTransactions(userData.id, token); // Usamos el nuevo servicio
        setTransactions(data); // Guardamos las transacciones en el estado
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar las transacciones:", error);
        setError("Hubo un problema al cargar la actividad. Inténtalo más tarde.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token, userData]);

  // Filtrado y paginación
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg text-darkCustom font-bold mb-4">{title}</h2>

      {loading ? (
        <p className="text-gray-500">Cargando actividad...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {(limit ? paginatedTransactions.slice(0, limit) : paginatedTransactions).map(
              (transaction) => (
                <li key={transaction.id} className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <div
                      className={`rounded-full h-4 w-4 mr-4 ${
                        transaction.type === "Deposit" ? "bg-greenCustom" : "bg-red-500"
                      }`}
                    ></div>
                    <p className="text-darkCustom">{transaction.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-darkCustom">{`$ ${Math.abs(transaction.amount)}`}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.dated).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </li>
              )
            )}
          </ul>

          {showPagination && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="text-darkCustom px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Anterior
              </button>
              <button
                disabled={currentPage === Math.ceil(transactions.length / pageSize)}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="text-darkCustom px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

      {showViewAll && (
        <div className="text-right mt-4">
          <Link href="/actividad" className="text-darkCustom font-bold hover:underline">
            Ver toda tu actividad
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

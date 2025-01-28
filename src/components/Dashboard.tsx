import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getAllTransactions } from "@/services/TransactionsService";

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
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all"); // Estado para el filtro de período
  const [selectedType, setSelectedType] = useState<string>("all"); // Estado para el filtro de tipo de operación
  const pageSize = 10;

  // Cargar las transacciones al montar el componente
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token || !userData?.id) {
        setError("No se pudo cargar la actividad. Inicia sesión nuevamente.");
        setLoading(false);
        return;
      }

      try {
        const data = await getAllTransactions(userData.id, token);

        // Ordenar las transacciones por fecha (descendente)
        const sortedTransactions = data.sort(
          (a, b) => new Date(b.dated).getTime() - new Date(a.dated).getTime()
        );

        setTransactions(sortedTransactions); // Guardamos las transacciones originales
        setFilteredTransactions(sortedTransactions); // Por defecto, no hay filtros aplicados
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar las transacciones:", error);
        setError("Hubo un problema al cargar la actividad. Inténtalo más tarde.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token, userData]);

  // Aplicar filtros por período y tipo
  useEffect(() => {
    let filtered: Transaction[] = transactions;

    // Filtro por período
    const today = new Date();
    if (selectedPeriod !== "all") {
      const dateFilterMap: { [key: string]: (tx: Transaction) => boolean } = {
        today: (tx) => {
          const transactionDate = new Date(tx.dated);
          return (
            transactionDate.getDate() === today.getDate() &&
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear()
          );
        },
        yesterday: (tx) => {
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);
          const transactionDate = new Date(tx.dated);
          return (
            transactionDate.getDate() === yesterday.getDate() &&
            transactionDate.getMonth() === yesterday.getMonth() &&
            transactionDate.getFullYear() === yesterday.getFullYear()
          );
        },
        lastWeek: (tx) => {
          const lastWeek = new Date();
          lastWeek.setDate(today.getDate() - 7);
          return new Date(tx.dated) >= lastWeek;
        },
        last15Days: (tx) => {
          const last15Days = new Date();
          last15Days.setDate(today.getDate() - 15);
          return new Date(tx.dated) >= last15Days;
        },
        lastMonth: (tx) => {
          const lastMonth = new Date();
          lastMonth.setMonth(today.getMonth() - 1);
          return new Date(tx.dated) >= lastMonth;
        },
        last3Months: (tx) => {
          const last3Months = new Date();
          last3Months.setMonth(today.getMonth() - 3);
          return new Date(tx.dated) >= last3Months;
        },
      };

      filtered = filtered.filter(dateFilterMap[selectedPeriod]);
    }

    // Filtro por tipo
    if (selectedType !== "all") {
      filtered = filtered.filter((tx) => {
        if (selectedType === "ingresos") return tx.type === "Deposit"; // Ingresos
        if (selectedType === "egresos") return tx.type === "Transaction"; // Egresos
        return true;
      });
    }

    setFilteredTransactions(filtered); // Actualizamos el estado con los filtros aplicados
  }, [selectedPeriod, selectedType, transactions]);

  // Filtrado y paginación
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg text-darkCustom font-bold mb-4">{title}</h2>

      {/* Filtros por período */}
      <div className="mb-4">
        <label htmlFor="periodFilter" className="block text-darkCustom font-bold mb-2">
          Filtrar por período:
        </label>
        <select
          id="periodFilter"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="w-full py-2 px-4 border border-gray-300 text-darkCustom rounded-md focus:outline-none focus:ring-2 focus:ring-greenCustom"
        >
          <option value="all">Todos</option>
          <option value="today">Hoy</option>
          <option value="yesterday">Ayer</option>
          <option value="lastWeek">Última semana</option>
          <option value="last15Days">Últimos 15 días</option>
          <option value="lastMonth">Último mes</option>
          <option value="last3Months">Últimos 3 meses</option>
        </select>
      </div>

      {/* Filtro por tipo */}
      <div className="mb-4">
        <label htmlFor="typeFilter" className="block text-darkCustom font-bold mb-2">
          Filtrar por tipo de operación:
        </label>
        <select
          id="typeFilter"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full py-2 px-4 border border-gray-300 text-darkCustom rounded-md focus:outline-none focus:ring-2 focus:ring-greenCustom"
        >
          <option value="all">Todos</option>
          <option value="ingresos">Ingresos</option>
          <option value="egresos">Egresos</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando actividad...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {paginatedTransactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <div
                    className={`rounded-full h-4 w-4 mr-4 ${transaction.type === "Deposit" ? "bg-greenCustom" : "bg-red-500"
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
            ))}
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
                disabled={currentPage === Math.ceil(filteredTransactions.length / pageSize)}
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

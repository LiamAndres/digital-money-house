import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getAllTransactions } from "@/services/TransactionsService";
import router from "next/router";

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

interface DashboardProps {
  limit?: number;              // Límite de transacciones a mostrar
  showPagination?: boolean;    // Si muestra o no paginación
  showViewAll?: boolean;       // Si muestra o no el enlace "Ver toda tu actividad"
  title: string;               // Título del dashboard
  showFilters?: boolean;      // Si muestra o no los filtros
}

const Dashboard: React.FC<DashboardProps> = ({ limit, showPagination, showViewAll, title, showFilters = true }) => {
  const { token, userData } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para el buscador
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const pageSize = 10;

  // Cargar las transacciones al montar el componente
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token || !userData) {
        return; // No ejecuta la petición hasta que userData esté listo
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

  // Leer el parámetro "search" desde la URL y aplicarlo al estado
  useEffect(() => {
    const { search } = router.query;
    if (typeof search === "string") {
      setSearchTerm(search);
    }
  }, [router.query]);

  // Aplicar filtros por período, tipo y palabras clave
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
        if (selectedType === "ingresos") return tx.type === "Deposit";
        if (selectedType === "egresos") return tx.type === "Transaction" || tx.type === "Transfer";
        return true;
      });
    }

    // Filtro por palabras clave (buscador)
    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((tx) =>
        tx.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredTransactions(filtered); // Actualizamos el estado con los filtros aplicados
  }, [selectedPeriod, selectedType, searchTerm, transactions]);

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    setSelectedPeriod("all");
    setSelectedType("all");
    setSearchTerm("");
    setFilteredTransactions(transactions); // Restaurar la lista completa
    setCurrentPage(1); // Volver a la primera página
    router.push("/actividad", undefined, { shallow: true }); // Limpiar query sin recargar
  };

  // Filtrado y paginación
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>


      {/* Seccion de Buscador y filtros */}
      {showFilters && (
        <>
          {/* Buscador y botón Filtrar (FUERA del Dashboard en Desktop) */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            {/* Buscador */}
            <input
              id="searchFilter"
              type="text"
              placeholder="Buscar en tu actividad"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[200px] md:min-w-[300px] lg:w-full py-2 px-4 border border-gray-300 text-darkCustom rounded-md focus:outline-none focus:ring-2 focus:ring-greenCustom"
            />

            {/* Botón Filtrar (Solo visible en Desktop) */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="hidden md:flex bg-greenCustom text-darkCustom font-bold py-2 px-4 rounded-md hover:bg-opacity-90 items-center gap-2"
            >
              <span>Filtrar</span>
              <img src="/images/icono-filtro.svg" alt="Filtrar" className="h-5 w-5" />
            </button>
          </div>
          {/* Modal de filtros */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h3 className="text-darkCustom font-bold mb-4">Filtrar por:</h3>

                {/* Período */}
                <div className="mb-4">
                  <label className="block text-darkCustom font-bold mb-2">Período</label>
                  <select
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

                {/* Tipo de operación */}
                <div className="mb-4">
                  <label className="block text-darkCustom font-bold mb-2">Tipo de operación</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full py-2 px-4 border border-gray-300 text-darkCustom rounded-md focus:outline-none focus:ring-2 focus:ring-greenCustom"
                  >
                    <option value="all">Todos</option>
                    <option value="ingresos">Ingresos</option>
                    <option value="egresos">Egresos</option>
                  </select>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setSelectedPeriod("all");
                      setSelectedType("all");
                      setIsFilterOpen(false);
                    }}
                    className="text-red-500 font-bold"
                  >
                    Borrar filtros
                  </button>

                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="bg-greenCustom text-darkCustom font-bold py-2 px-4 rounded-md hover:bg-opacity-90"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div data-testid="dashboard-container" className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-darkCustom font-bold">{title}</h2>
          {/* Botón Filtrar (Visible solo en Mobile) */}
          {showFilters && (
            <button
              onClick={() => setIsFilterOpen(true)}
              className="block md:hidden text-darkCustom font-bold py-2 px-4 rounded-md hover:bg-opacity-90 flex items-center gap-2"
            >
              <span>Filtrar</span>
              <img src="/images/icono-filtro-mobile.svg" alt="Filtrar" className="h-5 w-5" />
            </button>
          )}

        </div>

        {/* Sección de registros mostrados ingresos y egresos */}
        {loading ? (
          <p className="text-gray-500">Cargando actividad...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {paginatedTransactions.map((transaction) => (
                <li
                  key={transaction.id}
                  onClick={() =>
                    router.push(`/detalle-transaccion/${transaction.id}?accountId=${transaction.account_id}`)
                  }
                  className="flex justify-between items-center py-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-all"
                >
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
                {/* <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="text-darkCustom px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Anterior
              </button> */}
                {/* Números de página */}
                {[...Array(Math.ceil(filteredTransactions.length / pageSize)).keys()].map((num) => (
                  <button
                    key={num + 1}
                    onClick={() => setCurrentPage(num + 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === num + 1 ? "bg-grayCustom text-darkCustom font-bold" : "bg-white text-darkCustom font-bold hover:bg-gray-300"
                      }`}
                  >
                    {num + 1}
                  </button>
                ))}
                {/* <button
                disabled={currentPage === Math.ceil(filteredTransactions.length / pageSize)}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="text-darkCustom px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Siguiente
              </button> */}
              </div>
            )}
          </>
        )}

        {showViewAll && (
          <div className="mt-4">
            <Link
              href="/actividad"
              className="text-darkCustom font-bold hover:underline flex justify-between items-center"
            >
              <span>Ver toda tu actividad</span>
              <img src="/images/Icon-flecha-negra.png" alt="Continuar" className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </>

  );
};

export default Dashboard;

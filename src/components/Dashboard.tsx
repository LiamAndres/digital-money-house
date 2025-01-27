// Componente reutilizable del dashboard
import Link from "next/link";
import React from "react";

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
  transactions: Transaction[]; // Array de transacciones
  limit?: number;              // Límite de transacciones a mostrar
  showPagination?: boolean;    // Si muestra o no paginación
  showViewAll?: boolean;       // Si muestra o no el enlace "Ver toda tu actividad
  title: string;               // Título del dashboard
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, limit, showPagination, showViewAll, title }) => {
  const displayedTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg text-darkCustom font-bold mb-4">{title}</h2>
      <ul className="divide-y divide-gray-200">
        {displayedTransactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between items-center py-2">
            <div className="flex items-center">
              <div className="bg-greenCustom rounded-full h-4 w-4 mr-4"></div>
              <p className="text-darkCustom">{transaction.description}</p>
            </div>
            <div className="text-right">
              <p className="text-darkCustom">{`$ ${transaction.amount}`}</p>
              <p className="text-sm text-gray-500">{transaction.dated}</p>
            </div>
          </li>
        ))}
      </ul>
      {showPagination && (
        <div className="text-darkCustom font-bold flex justify-center mt-4">
          <p>Paginación (Placeholder)</p>
        </div>
      )}

      {/* Mostrar el enlace "Ver toda tu actividad" si está habilitado */}
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

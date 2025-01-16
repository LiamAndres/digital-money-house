import Dashboard from "@/components/Dashboard";
import Layout from "@/components/Layout";
import React, { useState } from "react";


const Actividad = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const mockTransactions = Array(20).fill(null).map((_, index) => ({
    account_id: 1,
    amount: 1265.57,
    dated: "sábado",
    description: `Transacción ${index + 1}`,
    destination: "Destino",
    id: index + 1,
    origin: "Cuenta",
    type: "transfer",
  }));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = mockTransactions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Layout>
    <div className="p-6">
      <Dashboard
        transactions={paginatedTransactions}
        title="Tu actividad"
        showViewAll={false}
        showPagination={true}
      />
    </div>
    </Layout>
  );
};

export default Actividad;

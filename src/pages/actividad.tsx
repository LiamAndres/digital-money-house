import Dashboard from "@/components/Dashboard";
import Layout from "@/components/Layout";
import React, { useState } from "react";


const Actividad = () => {
  return (
    <Layout>
      <div className="p-6">
        <Dashboard
          title="Tu actividad"
          showViewAll={false}
          showPagination={true}
        />
      </div>
    </Layout>
  );
};

export default Actividad;

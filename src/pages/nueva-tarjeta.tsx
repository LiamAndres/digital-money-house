import React, { useState } from "react";

import Layout from "@/components/Layout";
import CreditCard from "@/components/CreditCard";

export default function NuevaTarjeta() {
  const [form, setForm] = useState({
    number_id: "", // Número de la tarjeta
    first_last_name: "", // Nombre y apellido del titular
    expiration_date: "", // Fecha de vencimiento
    cod: "", // Código de seguridad (CVV)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos enviados al backend:", form);
    // Aquí se implementaría la conexión al endpoint POST /api/accounts/{account_id}/cards
  };

  const isFormEmpty =
    !form.number_id && !form.first_last_name && !form.expiration_date && !form.cod;

  return (
    <Layout>
      <div className="mt-8 flex flex-col items-center gap-6 px-4 md:px-8">
        {/* Componente de la tarjeta visual */}
        <CreditCard
          cardNumber={form.number_id}
          name={form.first_last_name}
          expirationDate={form.expiration_date}
          isInitial={isFormEmpty} // Pasamos si está vacío al componente CreditCard
        />

        {/* Formulario */}
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="number_id"
            placeholder="Número de la tarjeta*"
            value={form.number_id}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-greenCustom"
          />
          <input
            type="text"
            name="first_last_name"
            placeholder="Nombre y apellido*"
            value={form.first_last_name}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-greenCustom"
          />
          <input
            type="text"
            name="expiration_date"
            placeholder="Fecha de vencimiento (MM/AA)*"
            value={form.expiration_date}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-greenCustom"
          />
          <input
            type="text"
            name="cod"
            placeholder="Código de seguridad*"
            value={form.cod}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-greenCustom"
          />

          <button
            type="submit"
            className="bg-greenCustom text-darkCustom font-bold w-full py-2 rounded hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={
              !form.number_id || !form.first_last_name || !form.expiration_date || !form.cod
            }
          >
            Continuar
          </button>
        </form>
      </div>
    </Layout>
  );
}

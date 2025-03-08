import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import CreditCard from "@/components/CreditCard";
import { useAuth } from "@/context/AuthContext";
import { createCard, getCards } from "@/services/CardsService";

export default function NuevaTarjeta() {
  const { token, userData } = useAuth();
  const router = useRouter();
  const [cardCount, setCardCount] = useState(0); // Estado para contar tarjetas

  useEffect(() => {
    const fetchCards = async () => {
      if (!token || !userData) return;
      try {
        const cards = await getCards(userData.id, token);
        setCardCount(cards.length); // Guardar la cantidad de tarjetas actuales
      } catch (error) {
        console.error("Error al obtener tarjetas:", (error as Error).message);
      }
    };
    fetchCards();
  }, [token, userData]);

  const [form, setForm] = useState({
    number_id: "", // Número de la tarjeta
    first_last_name: "", // Nombre y apellido del titular
    expiration_date: "", // Fecha de vencimiento
    cod: "", // Código de seguridad (CVV)
  });

  const [isLoading, setIsLoading] = useState(false); // Indicador de carga

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validaciones específicas por campo
    if (name === "number_id") {
      // Solo permitir números y limitar a 16 caracteres
      const formattedValue = value.replace(/\D/g, "").slice(0, 16);
      setForm((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "first_last_name") {
      // Convertir a mayúsculas, eliminar números y signos especiales, limitar a 30 caracteres
      const formattedValue = value
        .toUpperCase() // Convertir a mayúsculas
        .replace(/[^A-Z\s]/g, "") // Permitir solo letras y espacios
        .slice(0, 30); // Limitar a 30 caracteres
      setForm((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "expiration_date") {
      // Validar formato MM/YYYY y permitir solo números y "/"
      const formattedValue = value
        .replace(/[^0-9/]/g, "") // Eliminar caracteres no válidos
        .replace(/^(\d{2})(\d{0,4})$/, "$1/$2") // Insertar "/" después de 2 dígitos
        .slice(0, 7); // Limitar a 7 caracteres (MM/YYYY)
      setForm((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "cod") {
      // Solo permitir números y limitar a 3 caracteres
      const formattedValue = value.replace(/\D/g, "").slice(0, 3);
      setForm((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      // Para otros campos, mantener el comportamiento estándar
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token || !userData) {
      alert("No se ha iniciado sesión. Por favor, vuelve a iniciar sesión.");
      return;
    }

    if (cardCount >= 10) {
      alert("❌ No puedes agregar más de 10 tarjetas.");
      router.push("/tarjetas");
      return;
    }

    // Validar formato de expiration_date antes de enviar
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/20\d{2}$/;
    if (!expirationDateRegex.test(form.expiration_date)) {
      alert("La fecha de vencimiento debe estar en el formato MM/YYYY, por ejemplo, 12/2028.");
      return;
    }

    try {
      setIsLoading(true); // Iniciar la carga

      // Llamar al servicio para crear la tarjeta
      const createdCard = await createCard(userData.id, token, {
        ...form,
        cod: parseInt(form.cod, 10), // Asegurar que el código de seguridad sea un número
        number_id: parseInt(form.number_id, 10), // Asegurar que el número de tarjeta sea un número
      });

      console.log("Tarjeta creada exitosamente:", createdCard);

      alert("Tarjeta creada exitosamente.");
      router.push("/tarjetas"); // Redirigir a /tarjetas tras éxito
    } catch (error) {
      console.error("Error al crear la tarjeta:", (error as Error).message);
      alert("Hubo un error al crear la tarjeta. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false); // Terminar la carga
    }
  };

  const isFormEmpty =
    !form.number_id && !form.first_last_name && !form.expiration_date && !form.cod;

  return (
    <Layout>
      <div className="mt-8 flex flex-col items-center gap-6 px-4 md:px-8">
        {cardCount >= 10 ? (
          <p className="text-red-500 font-bold">❌ No puedes agregar más de 10 tarjetas.</p>
        ) : (
          <>
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
                className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-greenCustom
              ${form.number_id ? "text-darkCustom" : "text-gray-400"}`}
              />
              <input
                type="text"
                name="first_last_name"
                placeholder="Nombre y apellido*"
                value={form.first_last_name}
                onChange={handleChange}
                className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-greenCustom
              ${form.number_id ? "text-darkCustom" : "text-gray-400"}`}
              />
              <input
                type="text"
                name="expiration_date"
                placeholder="Fecha de vencimiento (MM/AA)*"
                value={form.expiration_date}
                onChange={handleChange}
                className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-greenCustom
              ${form.number_id ? "text-darkCustom" : "text-gray-400"}`}
              />
              <input
                type="text"
                name="cod"
                placeholder="Código de seguridad*"
                value={form.cod}
                onChange={handleChange}
                className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-greenCustom
              ${form.number_id ? "text-darkCustom" : "text-gray-400"}`}
              />

              <button
                type="submit"
                disabled={
                  !form.number_id || !form.first_last_name || !form.expiration_date || !form.cod || isLoading
                }
                className={`bg-greenCustom text-darkCustom font-bold w-full py-2 rounded hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed ${isLoading && "cursor-wait"
                  }`}
              >
                {isLoading ? "Creando..." : "Continuar"}
              </button>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
}

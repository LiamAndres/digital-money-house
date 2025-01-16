import { useState } from "react";
import Layout from "@/components/Layout";

export default function Tarjetas() {
  const [cards, setCards] = useState([
    { id: 1, number_id: "1234567890120000" },
    { id: 2, number_id: "1234567890124067" },
    { id: 3, number_id: "1234567890128040" },
    { id: 4, number_id: "1234567890129006" },
  ]);

  const handleDelete = (id: number) => {
    const confirmDelete = confirm("¿Estás seguro de eliminar esta tarjeta?");
    if (confirmDelete) {
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    }
  };

  return (
    <Layout>
      <div className="bg-EEEAEA min-h-screen flex flex-col gap-6 px-4 md:px-8 pt-6">
        {/* Bloque 1: Nueva tarjeta */}
        <div className="bg-darkCustom text-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">Agregá tu tarjeta de débito o crédito</h2>
          <div className="flex items-center justify-between">
            {/* Icono "+" y texto "Nueva tarjeta" alineados a la izquierda */}
            <a
              href="/nueva-tarjeta"
              className="flex items-center gap-2 hover:underline"
            >
              <img src="/images/icon-agregar.png" alt="Agregar" className="h-6 w-6" />
              <span className="text-greenCustom font-bold">Nueva tarjeta</span>
            </a>
            {/* Icono de flecha alineado a la derecha */}
            <a href="/nueva-tarjeta">
              <img
                src="/images/flecha-continuar.png"
                alt="Continuar"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>

        {/* Bloque 2: Tus tarjetas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-darkCustom font-bold text-lg mb-4">Tus tarjetas</h2>
          {cards.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {cards.map((card) => (
                <li
                  key={card.id}
                  className="flex justify-between items-center py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-greenCustom rounded-full h-4 w-4"></div>
                    <p className="text-darkCustom">Terminada en {card.number_id.slice(-4)}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="text-darkCustom hover:underline"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tienes tarjetas asociadas.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

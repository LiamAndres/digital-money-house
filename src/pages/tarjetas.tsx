import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { getCards, deleteCard } from "@/services/CardsService";
import { getAccount } from "@/services/AccountService";

interface Card {
  id: number;
  number_id: number;
  cod: number;
  expiration_date: string;
  first_last_name: string;
  account_id: number;
}

export default function Tarjetas() {
  const { token } = useAuth();
  const [cards, setCards] = useState<Card[]>([]); // Estado inicial vacío con tipo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      if (!token) {
        setError("No se encontró un token de sesión.");
        setLoading(false);
        return;
      }

      try {
        // Obtener el account_id
        const account = await getAccount(token);

        // Obtener las tarjetas asociadas al account_id
        const cardsData = await getCards(account.id, token);

        setCards(cardsData); // Actualizar las tarjetas en el estado
        setLoading(false);
      } catch (error) {
        console.error(
          "Error al cargar las tarjetas:",
          (error as Error).message || "Error desconocido"
        );
        setError(
          "Hubo un problema al cargar las tarjetas. Por favor, intenta nuevamente."
        );
        setLoading(false);
      }
    };

    fetchCards();
  }, [token]);

  const handleDelete = async (cardId: number) => {
    const confirmDelete = confirm("¿Estás seguro de eliminar esta tarjeta?");
    if (!confirmDelete) return;

    if (!token) {
      alert("No se encontró un token de sesión. Por favor, inicia sesión nuevamente.");
      return;
    }

    try {
      setLoading(true); // Mostrar indicador de carga

      // Obtener el `account_id` del usuario
      const account = await getAccount(token);

      // Llamar al servicio para eliminar la tarjeta
      await deleteCard(account.id, cardId, token);

      // Actualizar el estado local eliminando la tarjeta
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));

      alert("Tarjeta eliminada con éxito.");
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", (error as Error).message);
      alert("Hubo un problema al eliminar la tarjeta. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <Layout>
      <div className="bg-EEEAEA min-h-screen flex flex-col gap-6 px-4 md:px-8 pt-6">
        {/* Bloque 1: Nueva tarjeta */}
        <div className="bg-darkCustom text-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">
            Agregá tu tarjeta de débito o crédito
          </h2>
          <div className="flex items-center justify-between">
            {/* Icono "+" y texto "Nueva tarjeta" alineados a la izquierda */}
            <a href="/nueva-tarjeta" className="flex items-center gap-2 hover:underline">
              <img src="/images/icon-agregar.png" alt="Agregar" className="h-6 w-6" />
              <span className="text-greenCustom font-bold">Nueva tarjeta</span>
            </a>
            {/* Icono de flecha alineado a la derecha */}
            <a href="/nueva-tarjeta">
              <img src="/images/flecha-continuar.png" alt="Continuar" className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Bloque 2: Tus tarjetas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-darkCustom font-bold text-lg mb-4">Tus tarjetas</h2>

          {loading ? (
            <p className="text-gray-500">Cargando tarjetas...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : cards.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {cards.map((card) => (
                <li
                  key={card.id}
                  className="flex justify-between items-center py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-greenCustom rounded-full h-4 w-4"></div>
                    <p className="text-darkCustom">
                      Terminada en {card.number_id.toString().slice(-4)}
                    </p>
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

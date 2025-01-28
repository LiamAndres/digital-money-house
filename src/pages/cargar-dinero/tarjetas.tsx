import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { getCards } from "@/services/CardsService";
import { getAccount } from "@/services/AccountService";
import CardList from "@/components/CardList";
import AddNewCard from "@/components/AddNewCard";

// Definir la interfaz para las tarjetas
interface Card {
    id: number;
    number_id: number;
    [key: string]: any; // Opcional, si hay otras propiedades que no conocemos
}

export default function SeleccionarTarjeta() {
    const { token } = useAuth();
    const router = useRouter();
    const [cards, setCards] = useState<Card[]>([]); // Tipo explícito para la lista de tarjetas
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCard, setSelectedCard] = useState<Card | null>(null); // Tipo explícito para la tarjeta seleccionada

    useEffect(() => {
        const fetchCards = async () => {
            if (!token) {
                setError("No se encontró un token de sesión.");
                setLoading(false);
                return;
            }

            try {
                const account = await getAccount(token);
                const cardsData = await getCards(account.id, token);
                setCards(cardsData);
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar las tarjetas:", (error as Error).message);
                setError("Hubo un problema al cargar las tarjetas.");
                setLoading(false);
            }
        };

        fetchCards();
    }, [token]);

    const handleContinue = () => {
        if (!selectedCard) {
            alert("Por favor, selecciona una tarjeta.");
            return;
        }

        // Redirigir con los datos de la tarjeta seleccionada
        router.push({
            pathname: "/cargar-dinero/ingresar-monto",
            query: { cardId: selectedCard.id, cardNumber: selectedCard.number_id },
        });
    };

    return (
        <Layout>
            <div className="bg-EEEAEA min-h-screen flex flex-col gap-6 px-4 md:px-8 pt-6">
                {/* Caja oscura */}
                <div className="bg-darkCustom text-white rounded-lg shadow-lg p-6">
                    {/* Título */}
                    <h2 className="text-greenCustom font-bold text-lg mb-6">
                        Seleccionar tarjeta
                    </h2>

                    {/* Componente de tarjetas */}
                    {loading ? (
                        <p className="text-gray-500">Cargando tarjetas...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <CardList
                            cards={cards}
                            selectedCardId={selectedCard?.id || null}
                            onSelect={(id) =>
                                setSelectedCard(cards.find((card) => card.id === id) || null)
                            }
                        />
                    )}

                    {/* Footer: Nueva tarjeta + Continuar */}
                    <div className="flex justify-between items-center mt-6">
                        <AddNewCard href="/nueva-tarjeta" />
                        <button
                            onClick={handleContinue}
                            className="bg-greenCustom text-darkCustom font-bold py-2 px-4 rounded-md hover:bg-opacity-90"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

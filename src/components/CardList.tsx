import React from "react";

interface Card {
    id: number;
    number_id: number;
}

interface CardListProps {
    cards: Card[];
    onDelete?: (cardId: number) => void; // Opción para eliminar tarjeta (opcional)
}

export default function CardList({ cards, onDelete }: CardListProps) {
    return (
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
                                <p className="text-darkCustom">
                                    Terminada en {card.number_id.toString().slice(-4)}
                                </p>
                            </div>
                            {onDelete && (
                                <button
                                    onClick={() => onDelete(card.id)}
                                    className="text-darkCustom hover:underline"
                                >
                                    Eliminar
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No tienes tarjetas asociadas.</p>
            )}
        </div>
    );
}

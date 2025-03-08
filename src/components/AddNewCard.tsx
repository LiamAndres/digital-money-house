import Link from "next/link";
import React from "react";

interface AddNewCardProps {
  href: string; // Ruta a la que redirige
  cardCount?: number; // Cantidad de tarjetas actuales
}

const AddNewCard: React.FC<AddNewCardProps> = ({ href, cardCount }) => {
  const maxCards = 10; // Límite de tarjetas
  return (
    <>
      {cardCount !== undefined && cardCount >= maxCards ? (
        <p className="text-red-500 font-bold">❌ Has alcanzado el límite de 10 tarjetas.</p>
      ) : (
        <Link
          href={href}
          className="flex items-center gap-2 text-greenCustom font-bold hover:underline"
        >
          <img src="/images/icon-agregar.png" alt="Agregar" className="h-6 w-6" />
          <span>Nueva tarjeta</span>
        </Link>
      )}
    </>
  );
};

export default AddNewCard;

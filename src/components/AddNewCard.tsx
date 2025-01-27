import Link from "next/link";
import React from "react";

interface AddNewCardProps {
  href: string; // Ruta a la que redirige
}

const AddNewCard: React.FC<AddNewCardProps> = ({ href }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-greenCustom font-bold hover:underline"
    >
      <img src="/images/icon-agregar.png" alt="Agregar" className="h-6 w-6" />
      <span>Nueva tarjeta</span>
    </Link>
  );
};

export default AddNewCard;

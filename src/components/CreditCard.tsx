import React from "react";

interface CreditCardProps {
  cardNumber: string;
  name: string;
  expirationDate: string;
  isInitial?: boolean;
}

const CreditCard: React.FC<CreditCardProps> = ({
  cardNumber,
  name,
  expirationDate,
  isInitial = false,
}) => {
  if (isInitial) {
    return (
      <div className="w-full max-w-sm bg-gray-200 text-gray-500 rounded-lg p-8 shadow-lg">
        {/* Diseño inicial de tarjeta */}
        <div className="flex justify-between items-center mb-8">
            <p className="font-bold text-2xl">Tarjeta</p>
          <div className="bg-gray-400 w-16 h-10 rounded"></div>
        </div>
        <p className="text-xl font-mono tracking-wider mb-8">•••• •••• •••• ••••</p>
        <div className="flex justify-between text-lg">
          <span>NOMBRE DEL TITULAR</span>
          <span>MM/AA</span>
        </div>
      </div>
    );
  }

  // Formatear el número de tarjeta (separado por bloques de 4)
  const formattedCardNumber = cardNumber
    .padEnd(16, "•")
    .replace(/(.{4})/g, "$1 ")
    .trim();

  // Renderizar tipo de tarjeta según los primeros dígitos
  const getCardType = () => {
    if (cardNumber.startsWith("4")) return "Visa";
    if (cardNumber.startsWith("5")) return "Mastercard";
    if (cardNumber.startsWith("3")) return "AMEX";
    return "Tarjeta";
  };

  return (
    <div className="w-full max-w-sm bg-darkCustom text-white rounded-lg p-8 shadow-lg">
      {/* Tipo de tarjeta */}
      <div className="flex justify-between items-center mb-8">
        <span className="font-bold text-2xl">{getCardType()}</span>
        <div className="bg-gray-700 w-16 h-10 rounded"></div>
      </div>

      {/* Número de tarjeta */}
      <p className="text-xl font-mono tracking-wider mb-8">{formattedCardNumber}</p>

      {/* Nombre del titular y fecha de vencimiento */}
      <div className="flex justify-between text-lg">
        <span className="uppercase">{name || "NOMBRE DEL TITULAR"}</span>
        <span>{expirationDate || "MM/AA"}</span>
      </div>
    </div>
  );
};

export default CreditCard;

import React, { useState } from "react";
interface CvuAliasBlockProps {
  cvu: string;
  alias: string;
}


export default function CvuAliasBlock({ cvu, alias }: CvuAliasBlockProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000); // Ocultar el mensaje después de 2 segundos
  };

  return (
    <div className="bg-darkCustom text-white rounded-lg p-6 shadow-lg w-full">
      <h2 className="text-lg font-bold mb-4">
        Copia tu CVU o alias para ingresar o transferir dinero desde otra cuenta
      </h2>
      <ul className="space-y-4">
        {[
          { label: "CVU", value: cvu },
          { label: "Alias", value: alias },
        ].map((item) => (
          <li key={item.label} className="flex justify-between items-center">
            <div className="flex-1">
              <p className="font-bold text-greenCustom">{item.label}</p>
              <p
                className="text-gray-300 text-sm md:text-base lg:text-lg overflow-hidden text-ellipsis whitespace-nowrap"
                title={item.value} // Mostrar el texto completo al pasar el ratón
              >
                {item.value}
              </p>
            </div>

            <button
              onClick={() => handleCopy(item.value)} // Copiar texto al portapapeles
              className="text-darkCustom p-2 rounded-full hover:bg-opacity-90"
            >
              <img
                src="/images/icon-copiar.png"
                alt="Copiar"
                className="h-5 w-5" // Ajusta el tamaño del icono
              />
            </button>
          </li>
        ))}
      </ul>
      {/* Mensaje de Copiado */}
      {copiedText && (
        <div className="fixed px-3 py-1 rounded-lg shadow-md text-darkCustom bg-greenCustom text-sm
        bottom-4 left-1/2 transform -translate-x-1/2 md:top-4 md:right-4 md:left-auto md:bottom-auto">
          ¡{copiedText} copiado!
        </div>
      )}
    </div>
  );
}

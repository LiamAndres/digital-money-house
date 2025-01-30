import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";

export default function IngresoCVU() {
  const { userData } = useAuth();
  const router = useRouter();
  const [cvuInput, setCvuInput] = useState("");
  const [error, setError] = useState("");
  const [serviceId, setServiceId] = useState<string | null>(null);

  // Recuperamos el ID del servicio desde localStorage
  useEffect(() => {
    const storedServiceId = localStorage.getItem("selectedServiceId");
    setServiceId(storedServiceId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cvuInput === userData?.cvu) {
      // Guardamos el CVU en localStorage para medios-de-pago
      localStorage.setItem("validatedCVU", cvuInput);

      // Redirigir a medios de pago con el ID del servicio
      router.push(`/pagar-servicio/medios-de-pago?id=${serviceId}`);
    } else {
      setError("El CVU ingresado no coincide con el de tu cuenta.");
    }
  };

  return (
    <Layout>
      <div className="p-6 pt-10 flex justify-center">
        <section className="bg-darkCustom text-white rounded-lg p-6 space-y-6 w-full max-w-lg">
          <h2 className="text-lg font-bold text-greenCustom">
            Número de cuenta sin el primer 2
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Ingresa tu CVU"
              value={cvuInput}
              onChange={(e) => setCvuInput(e.target.value)}
              className="w-full py-3 px-4 rounded-lg border border-gray-300 text-darkCustom focus:outline-none focus:ring-2 focus:ring-greenCustom"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-sm text-gray-400">
              Son 11 números sin espacios, sin el "2" inicial. Agregá ceros adelante si tenés menos.
            </p>
            <button
              type="submit"
              className="bg-greenCustom text-darkCustom font-bold py-3 px-6 rounded-lg w-full hover:bg-opacity-90 transition"
            >
              Continuar
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
}

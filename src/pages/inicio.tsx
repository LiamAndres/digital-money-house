import Layout from "@/components/Layout";
import withAuth from "@/utils/withAuth";

function Inicio() {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Bloque 1: Tarjeta Dinero Disponible */}
        <section className="bg-darkCustom text-white rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-lg">Dinero disponible</p>
            <h2 className="text-4xl font-bold mt-2">$ 6.890.534,17</h2>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-greenCustom underline">Ver tarjetas</a>
            <a href="#" className="text-greenCustom underline">Ver CVU</a>
          </div>
        </section>

        {/* Bloque 2: Botones principales */}
        <section className="flex flex-col md:flex-row justify-between gap-4">
          <button className="bg-greenCustom text-darkCustom font-bold py-3 rounded-lg w-full md:w-1/2">
            Cargar dinero
          </button>
          <button className="bg-greenCustom text-darkCustom font-bold py-3 rounded-lg w-full md:w-1/2">
            Pago de servicios
          </button>
        </section>

        {/* Bloque 3: Barra de búsqueda */}
        <section>
          <input
            type="text"
            placeholder="Buscar en tu actividad"
            className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-greenCustom"
          />
        </section>

        {/* Bloque 4: Dashboard */}
        <section>
          {/* Aquí se renderizará el componente Dashboard */}
          <p>Dashboard placeholder</p>
        </section>
      </div>
    </Layout>
  );
}

export default withAuth(Inicio);

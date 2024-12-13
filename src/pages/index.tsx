// Página principal (Landing Page).
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-blackCustom"
    /* style={{
      backgroundImage: "url('/images/landing.png')",

    }} */
    >
      {/* Navbar */}
      <Navbar />

      {/* landing header Section */}
      <header className="relative h-screen -mb-16">
        <picture>
          {/* Imagen para dispositivos móviles */}
          <source
            srcSet="/images/landing-mobile.png"
            media="(max-width: 768px)" // Pantallas hasta 768px (mobile)
          />
          {/* Imagen para tablet */}
          <source
            srcSet="/images/landing-tablet.png"
            media="(max-width: 1024px)" // Pantallas hasta 1024px (tablet)
          />
          {/* Imagen para desktop */}
          <img
            src="/images/landing.png" // Imagen predeterminada (desktop)
            alt="Landing page"
            className="absolute inset-0 w-full h-full object-cover object-[center_40%]" // Ajusta la posición del fondo
          />
        </picture>
        {/* Fondo oscuro para contraste */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Contenido alineado a la izquierda */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-start text-white px-4">
          <h1 className="text-4xl md:text-5xl font-normal leading-tight max-w-[15ch]">
            De ahora en adelante, hacés más con tu dinero
          </h1>
          <p className="text-xl md:text-2xl text-greenCustom mt-4">
            <span className="font-normal">Tu nueva </span>
            <span className="font-bold">billetera virtual</span>
          </p>
        </div>
      </header>



      {/* Servicios */}
      <section className="relative py-16 bg-greenCustom rounded-t-[30px] z-20">
        {/* Cards */}
        <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-6 -mt-32">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-[400px] mx-auto">
            <h3 className="font-bold text-[40px] leading-tight text-blackCustom text-center">
              Transferí dinero
            </h3>
            <div className="border-t-4 border-greenCustom my-4 mx-auto max-w-[400px]"></div>
            <p className="text-[20px] font-normal text-blackCustom text-start">
              Desde Digital Money House vas a poder transferir dinero a otras cuentas, así como también recibir transferencias y nuclear tu capital en nuestra billetera virtual.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-[400px] mx-auto">
            <h3 className="font-bold text-[40px] leading-tight text-blackCustom text-center">
              Pago de servicios
            </h3>
            <div className="border-t-4 border-greenCustom my-4 mx-auto max-w-[400px]"></div>
            <p className="text-[20px] font-normal text-blackCustom text-start">
              Pagá mensualmente los servicios en 3 simples clicks. Fácil, rápido y conveniente. Olvidate de las facturas en papel.
            </p>
          </div>
        </div>
      </section>




      {/* Footer */}
      <Footer />
    </div>
  );
}

// Pie de página con texto básico.

export default function Footer() {
  return (
    <footer className="bg-darkCustom text-greenCustom py-4 px-6 text-center md:text-start">
      <p>© 2024 Digital Money House. Todos los derechos reservados.</p>
      <p>
        Desarrollado por{" "}
        <a
          href="https://github.com/LiamAndres"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-bold hover:underline"
          aria-label="Perfil de GitHub de LiamAndres"
        >
          LiamAndres
        </a>
      </p>
    </footer>
  );
}

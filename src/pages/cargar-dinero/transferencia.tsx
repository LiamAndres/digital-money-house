import Layout from "@/components/Layout";
import CvuAliasBlock from "@/components/CvuAliasBlock";
import { useAuth } from "@/context/AuthContext";

export default function Transferencia() {
  const { userData } = useAuth();

  if (!userData) {
    return <Layout><div>Cargando datos...</div>;</Layout> // Mostrar mientras se cargan los datos
  }

  return (
    <Layout>
      <div className="bg-EEEAEA min-h-screen flex flex-col gap-6 px-4 md:px-8 pt-6">
        <CvuAliasBlock cvu={userData.cvu} alias={userData.alias} />
      </div>
    </Layout>
  );
}

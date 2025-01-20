import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function withAuth(WrappedComponent: React.ComponentType) {
    return function ProtectedRoute(props: any) {
        const router = useRouter();
        const { isAuthenticated } = useAuth();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push("/auth/login"); // Redirige al login si no está autenticado
            }
            
        }, [isAuthenticated, router]);

        // Renderiza la página solo si está autenticado
        if (!isAuthenticated) {
          return null; // Muestra nada mientras redirige
        }
        return <WrappedComponent {...props} />;
    };
}

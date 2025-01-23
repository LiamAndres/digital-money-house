import React, { createContext, useContext, useState, useEffect } from "react";
import { getAccount } from "@/services/AccountService";
import { getUser } from "@/services/UserService";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userData: {
    user_id: number;
    id: number;
    alias: string;
    cvu: string;
    firstname: string;
    lastname: string;
    email: string;
    dni: number;
    phone: string;
    available_amount: number;
  } | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  setUserData: (data: AuthContextType["userData"]) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<AuthContextType["userData"]>(null);

  // Sincronización con localStorage (nueva integración)
  useEffect(() => {
    const syncWithLocalStorage = () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        // Si no hay token en localStorage, limpiar estado del contexto
        setIsAuthenticated(false);
        setToken(null);
        setUserData(null);
      }
    };

    // Verificar el estado inicial al montar
    syncWithLocalStorage();

    // Escuchar cambios en localStorage para sincronizar en tiempo real
    window.addEventListener("storage", syncWithLocalStorage);

    return () => {
      window.removeEventListener("storage", syncWithLocalStorage);
    };
  }, []);

  // Restaurar sesión al cargar la aplicación
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          setToken(storedToken);
          setIsAuthenticated(true);
  
          // Restaurar datos del usuario y la cuenta
          const accountData = await getAccount(storedToken);
          const userData = await getUser(accountData.user_id, storedToken);
  
          setUserData({
            user_id: accountData.user_id,
            id: accountData.id,
            alias: accountData.alias,
            cvu: accountData.cvu,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            dni: userData.dni,
            phone: userData.phone,
            available_amount: accountData.available_amount,
          });
        } catch (error) {
          console.error("Error al restaurar sesión:", error);
          logout(); // Si falla, limpiamos el estado
        }
      }
    };
  
    restoreSession();
  }, []);

  const login = async (receivedToken: string) => {
    try {
      // Guardar el token en localStorage
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
      setIsAuthenticated(true);

      // Llamar a getAccount para obtener los datos de la cuenta
      const accountData = await getAccount(receivedToken);

      // Llamar a getUser para obtener los datos adicionales del usuario
      const userData = await getUser(accountData.user_id, receivedToken);

      // Guardar los datos de la cuenta en el estado
      setUserData({
        user_id: accountData.user_id,
        id: accountData.id,
        alias: accountData.alias,
        cvu: accountData.cvu,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        dni: userData.dni,
        phone: userData.phone,
        available_amount: accountData.available_amount,
      });
    } catch (error) {
      console.error("Error en login:", error);
      logout(); // En caso de error, limpiamos el estado
    }
  };

  const logout = () => {
    console.log("Ejecutando logout...");
    localStorage.clear(); // Limpia todo el almacenamiento local
    setIsAuthenticated(false);
    setToken(null);
    setUserData(null);
    console.log("Estado después de logout (dentro de logout):", {
      isAuthenticated,
      token,
      userData,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        userData,
        setUserData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

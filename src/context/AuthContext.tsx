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

  // Sincronización con localStorage
  useEffect(() => {
    const syncWithLocalStorage = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken && !token) {
        console.log("Sincronizando token desde localStorage...");
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
          console.error("Error al sincronizar sesión:", error);
          logout();
        }
      }
    };

    // Escuchar cambios en localStorage
    window.addEventListener("storage", syncWithLocalStorage);

    return () => {
      window.removeEventListener("storage", syncWithLocalStorage);
    };
  }, [token]);

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
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
      setIsAuthenticated(true);

      const accountData = await getAccount(receivedToken);
      const userData = await getUser(accountData.user_id, receivedToken);

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
      logout();
    }
  };

  const logout = () => {
    console.log("Ejecutando logout...");
    localStorage.clear();
    setIsAuthenticated(false);
    setToken(null);
    setUserData(null);
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

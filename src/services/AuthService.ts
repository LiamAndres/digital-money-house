const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

// ✅ Definimos la estructura de los datos de usuario para el registro
interface RegisterUserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// ✅ Definimos la estructura de credenciales para el login
interface LoginCredentials {
  email: string;
  password: string;
}

// ✅ Definimos la estructura de la respuesta del login
interface AuthResponse {
  token: string;
}

// ✅ Función para registrar un nuevo usuario
export const registerUser = async (userData: RegisterUserData): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // ✅ Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al registrar el usuario");
    }

    return await response.json(); // ✅ Devolvemos los datos en caso de éxito
  } catch (error) {
    console.error("Error en registerUser:", (error as Error).message);
    throw error;
  }
};

// ✅ Función para iniciar sesión
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al iniciar sesión");
    }

    return await response.json(); // ✅ Devuelve el token de autenticación en caso de éxito
  } catch (error) {
    console.error("Error en loginUser:", (error as Error).message);
    throw error;
  }
};

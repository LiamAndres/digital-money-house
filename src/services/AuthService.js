const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al registrar el usuario");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en registerUser:", error.message);
    throw error;
  }
};

// Función para iniciar sesión
export const loginUser = async (credentials) => {
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

    return await response.json(); // Devuelve el token de autenticación
  } catch (error) {
    console.error("Error en loginUser:", error.message);
    throw error;
  }
};

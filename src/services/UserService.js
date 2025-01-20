const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

// Función para obtener datos de un usuario
export const getUser = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: token, // Autenticación usando el token
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en getUser: Respuesta no válida del servidor:", errorData);
      throw new Error(errorData.error || "Error al obtener los datos del usuario");
    }

    const userData = await response.json();
    console.log("Datos del usuario obtenidos desde UserService:", userData);
    return userData; // Devuelve los datos del usuario
  } catch (error) {
    console.error("Error en getUser:", error.message);
    throw error;
  }
};

// Función para actualizar datos del usuario
export const updateUser = async (userId, token, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: token, // Autenticación usando el token
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Datos a actualizar
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en updateUser: Respuesta no válida del servidor:", errorData);
      throw new Error(errorData.error || "Error al actualizar los datos del usuario");
    }

    const updatedUserData = await response.json();
    console.log("Datos del usuario actualizados desde UserService:", updatedUserData);
    return updatedUserData; // Devuelve los datos actualizados
    
  } catch (error) {
    console.error("Error en updateUser:", error.message);
    throw error;
  }
};

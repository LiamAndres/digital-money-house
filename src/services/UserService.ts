const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

/**
 * ✅ Definimos la estructura de los datos de un usuario.
 */
interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  dni: number;
  phone: string;
  cvu: string;
  alias: string;
}

/**
 * ✅ Definimos la estructura de los datos que se pueden actualizar.
 */
interface UpdateUserData {
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  password?: string;
}

/**
 * ✅ Función para obtener datos de un usuario.
 * @param {number} userId - ID del usuario.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<User>} - Datos del usuario.
 */
export const getUser = async (userId: number, token: string): Promise<User> => {
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

    const userData: User = await response.json();
    console.log("Datos del usuario obtenidos desde UserService:", userData);
    return userData; // Devuelve los datos del usuario
  } catch (error) {
    console.error("Error en getUser:", (error as Error).message);
    throw error;
  }
};

/**
 * ✅ Función para actualizar datos del usuario.
 * @param {number} userId - ID del usuario.
 * @param {string} token - Token de autenticación.
 * @param {UpdateUserData} userData - Datos a actualizar.
 * @returns {Promise<User>} - Datos del usuario actualizados.
 */
export const updateUser = async (
  userId: number,
  token: string,
  userData: UpdateUserData
): Promise<User> => {
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

    const updatedUserData: User = await response.json();
    console.log("Datos del usuario actualizados desde UserService:", updatedUserData);
    return updatedUserData; // Devuelve los datos actualizados
  } catch (error) {
    console.error("Error en updateUser:", (error as Error).message);
    throw error;
  }
};

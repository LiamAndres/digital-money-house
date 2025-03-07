// services/api.ts

// URL base de la API
const API_BASE_URL = "https://digitalmoney.digitalhouse.com/api";

// Definimos la estructura de los datos de usuario para el registro
interface RegisterUserData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

// Definimos la estructura de credenciales para el login
interface LoginCredentials {
    email: string;
    password: string;
}

// Definimos la estructura de la respuesta del login
interface LoginResponse {
    token: string;
}

// Función para registrar un nuevo usuario
export const registerUser = async (userData: RegisterUserData): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData), // Convertimos el objeto userData a JSON
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al registrar el usuario");
        }

        // Parsear el JSON de la respuesta
        const data = await response.json();
        return data; // Devolvemos los datos al componente que llame esta función
    } catch (error) {
        console.error("Error en el registro:", (error as Error).message);
        throw error; // Relanzamos el error para manejarlo en el componente
    }
};

// Función para iniciar sesión
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
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

        // Retornar el token en caso de éxito
        return response.json();
    } catch (error) {
        console.error("Error en el inicio de sesión:", (error as Error).message);
        throw error;
    }
};

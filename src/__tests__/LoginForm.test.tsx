import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@/pages/auth/login";
import { AuthProvider } from "@/context/AuthContext";

jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
    return render(<AuthProvider>{ui}</AuthProvider>);
};

describe("Formulario de Login", () => {
    test("Muestra error si el email es inválido", async () => {
        renderWithProviders(<Login />);

        const emailInput = screen.getByPlaceholderText("Correo electrónico");
        fireEvent.change(emailInput, { target: { value: "correo-invalido" } });
        fireEvent.blur(emailInput);

        // Esperar hasta que el mensaje de error se renderice
        await waitFor(async () => {
            expect(await screen.findByText("Debe ser un correo válido")).toBeInTheDocument();
        });
    });

    test("Muestra error si la contraseña está vacía", async () => {
        renderWithProviders(<Login />);
    
        // Paso 1: Ingresar email válido y continuar
        const emailInput = screen.getByPlaceholderText("Correo electrónico");
        fireEvent.change(emailInput, { target: { value: "correo@valido.com" } });
        fireEvent.click(screen.getByText("Continuar"));
    
        // Paso 2: Esperar a que aparezca el input de contraseña
        const passwordInput = await screen.findByPlaceholderText("Contraseña");
    
        // Simular que el usuario no escribe nada y pierde el foco
        fireEvent.blur(passwordInput);
    
        // 🔹 Forzar validación manualmente
        await waitFor(async () => {
            expect(await screen.findByText("La contraseña es obligatoria")).toBeInTheDocument();
        });
    });
});

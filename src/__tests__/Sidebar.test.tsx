import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/context/AuthContext";

jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

const renderWithProviders = (isOpen = false) => {
    return render(
        <AuthProvider>
            <Sidebar isOpen={isOpen} onClose={jest.fn()} />
        </AuthProvider>
    );
};

test("El Sidebar se renderiza correctamente", () => {
    render(
        <AuthProvider>
            <Sidebar isOpen={true} onClose={() => {}} />
        </AuthProvider>
    );

    // Usa queryByTestId para evitar error si el elemento no existe
    expect(screen.queryByTestId("sidebar")).toBeInTheDocument();
});

test("El Sidebar está oculto por defecto", () => {
    render(
        <AuthProvider>
            <Sidebar isOpen={false} onClose={() => {}} />
        </AuthProvider>
    );

    expect(screen.getByTestId("sidebar")).toHaveClass("invisible"); // ✅ Verifica que está oculto
});

test("El Sidebar se cierra al hacer clic en el botón de cerrar", async () => {
    const mockOnClose = jest.fn();

    render(
        <AuthProvider>
            <Sidebar isOpen={true} onClose={mockOnClose} />
        </AuthProvider>
    );

    // Buscar el botón de cerrar (asegúrate de que el selector sea correcto)
    const closeButton = screen.getByRole("button", { name: /menú móvil/i });

    // Hacer clic en el botón de cerrar
    fireEvent.click(closeButton);

    // Verificar que la función onClose se llamó
    expect(mockOnClose).toHaveBeenCalled();
});

test("El Sidebar se muestra cuando se abre en mobile", () => {
    renderWithProviders(true); // 🔹 Renderizamos con isOpen=true

    const sidebar = screen.getByTestId("sidebar"); // 🔹 Buscamos el sidebar

    expect(sidebar).toBeVisible(); // ✅ Debe estar visible cuando isOpen=true
});


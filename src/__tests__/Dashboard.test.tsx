import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "@/components/Dashboard";
import { AuthProvider } from "@/context/AuthContext";

const renderWithProviders = (ui: React.ReactElement) => {
    return render(<AuthProvider>{ui}</AuthProvider>);
};

jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        pathname: "/inicio",
        query: {}, // Mock de query vacío
    }),
}));

describe("Dashboard", () => {
    test("Se renderiza correctamente con el título", () => {
        renderWithProviders(<Dashboard title="Tu actividad" />);
        
        expect(screen.getByTestId("dashboard-container")).toBeInTheDocument();
        expect(screen.getByText("Tu actividad")).toBeInTheDocument();
    });
});
test("Se renderiza correctamente con el título", async () => {
    renderWithProviders(<Dashboard title="Tu actividad" />);

    // Esperamos que el título esté en el documento
    expect(await screen.findByText(/Tu actividad/i)).toBeInTheDocument();
});

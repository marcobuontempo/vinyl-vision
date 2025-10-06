import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// NPM CONTEXT PROVIDERS
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// LOCAL CONTEXT PROVIDERS
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";

// STYLES IMPORTS
import "./styles/reset.css";

// INITIALISE TANSTACK QUERY CLIENT
export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

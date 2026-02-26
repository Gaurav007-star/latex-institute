import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/custom/AppSidebar";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store/store";

createRoot(document.getElementById("root")).render(
  <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <AuthProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
          <Toaster
            position="top-center"
            gutter={10}
            toastOptions={{
              duration: 4000,
              style: {
                background: "#ffffff",
                color: "#111827",
                padding: "20px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 500,
                boxShadow:
                  "0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 10px -6px rgba(0,0,0,0.1)",
              },

              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#ffffff",
                },
                style: {
                  borderLeft: "4px solid #22c55e",
                },
              },

              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
                style: {
                  borderLeft: "4px solid #ef4444",
                },
              },
            }}
          />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </>
);

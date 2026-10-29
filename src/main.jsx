<<<<<<< HEAD

=======
>>>>>>> bec28bfeec5abafaedd5d6bb2070e2d780565267
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
<<<<<<< HEAD
=======
import { ThemeProvider } from "./context/ThemeContext";
>>>>>>> bec28bfeec5abafaedd5d6bb2070e2d780565267
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
<<<<<<< HEAD
    <AuthProvider>
      <App />
    </AuthProvider>
=======
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
>>>>>>> bec28bfeec5abafaedd5d6bb2070e2d780565267
  </StrictMode>
);

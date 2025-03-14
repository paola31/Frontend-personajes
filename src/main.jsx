import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";  // Asegúrate de importar Home correctamente
import App from "./App";  // Tu lista de personajes
import Navbar from "./components/Navbar";
import PersonajeForm from "./components/PersonajeForm.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

function Root() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />   {/* Home ahora es la página principal */}
                <Route path="/crear" element={<PersonajeForm />} />
                <Route path="/personajes" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar";
import PersonajeForm from "./components/PersonajeForm.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import ListaPersonajes from "./ListaPersonajes.jsx";

function Root() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/crear" element={<PersonajeForm />} />
                <Route path="/personajes" element={<ListaPersonajes />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
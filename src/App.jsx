import { useEffect, useState } from "react";
import Home from "./components/Home.jsx";
import PersonajeModal from "./components/PersonajeModal";
import "./assets/styles/PersonajeModal.css";

function App() {
    const [personajes, setPersonajes] = useState([]);
    const [selectedPersonaje, setSelectedPersonaje] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/personajes")
            .then(response => response.json())
            .then(data => setPersonajes(data))
            .catch(error => console.error("Error cargando personajes:", error));
    }, []);

    // Función para abrir el modal
    const handleOpenModal = (personaje) => {
        setSelectedPersonaje(personaje);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setSelectedPersonaje(null);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Lista de Personajes</h1>
            <div className="row">
                {personajes.map((personaje) => (
                    <div key={personaje.id} className="col-md-4">
                        <div className="card">
                            <img src={personaje.imagen} className="card-img-top" alt={personaje.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{personaje.nombre}</h5>
                                <p className="card-text">{personaje.rol}</p>
                                <p className="card-text"><strong>Fecha:</strong> {new Date(personaje.fechaCreacion).toLocaleString()}</p>
                                <button className="btn btn-primary" onClick={() => handleOpenModal(personaje)}>
                                    Ver más
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPersonaje && (
                <PersonajeModal personaje={selectedPersonaje} onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default App;

import { useState, useEffect } from "react";
import "./assets/styles/ListaPersonajes.css";
import PersonajeModal from "./components/PersonajeModal.jsx";

function ListaPersonajes() {
    const [personajes, setPersonajes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPersonaje, setSelectedPersonaje] = useState(null);
    const [sortBy, setSortBy] = useState("nombre"); // Filtro por nombre o fecha

    // Cargar personajes desde el backend
    useEffect(() => {
        fetch("http://localhost:8080/personajes")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPersonajes(data);
            })
            .catch(error => console.error("Error al cargar los personajes:", error));
    }, []);

    // Función para eliminar personaje
    const eliminarPersonaje = async (id) => {
        const response = await fetch(`http://localhost:8080/personajes/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setPersonajes((prevPersonajes) =>
                prevPersonajes.filter((personaje) => personaje.id !== id)
            );
            alert("Personaje eliminado correctamente");
        } else {
            alert("Error al eliminar el personaje");
        }
    };

    // Función para mostrar el modal
    const mostrarModal = (personaje) => {
        setSelectedPersonaje(personaje);
        setModalVisible(true);
    };

    // Función para cerrar el modal
    const cerrarModal = () => {
        setModalVisible(false);
        setSelectedPersonaje(null);
    };

    // Función para actualizar datos del personaje
    const actualizarPersonaje = async (personajeActualizado) => {
        const response = await fetch(`http://localhost:8080/personajes/${personajeActualizado.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(personajeActualizado),
        });

        if (response.ok) {
            setPersonajes((prevPersonajes) =>
                prevPersonajes.map((personaje) =>
                    personaje.id === personajeActualizado.id ? personajeActualizado : personaje
                )
            );
            setModalVisible(false);
        } else {
            alert("Error al actualizar el personaje");
        }
    };

    // Ordenar personajes por nombre o fecha
    const sortedPersonajes = [...personajes].sort((a, b) => {
        if (sortBy === "nombre") {
            return a.nombre.localeCompare(b.nombre);
        } else if (sortBy === "fechaCreacion") {
            const dateA = new Date(a.fechaCreacion);
            const dateB = new Date(b.fechaCreacion);
            return dateA - dateB;
        }
        return 0;
    });

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="container mt-4">
            <h2 className="tittle-h2">Lista de Personajes</h2>
            <div className="select-container">
                <label htmlFor="sortBy">Ordenar por: </label>
                <select id="sortBy" onChange={handleSortChange} value={sortBy}>
                    <option value="nombre">Nombre</option>
                    <option value="fechaCreacion">Fecha de Creación</option>
                </select>
            </div>

            <div className="row">
                {sortedPersonajes.map((personaje) => (
                    <div key={personaje.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={personaje.imagen} className="card-img-top" alt={personaje.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{personaje.nombre}</h5>
                                <p className="card-text">{personaje.rol}</p>
                                <p className="card-text">
                                    <strong>Fecha:</strong>{" "}
                                    {new Date(personaje.fechaCreacion).toLocaleString('es-CO', {
                                        timeZone: 'America/Bogota',
                                        hour12: false,
                                    })}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-primary" onClick={() => mostrarModal(personaje)}>
                                        Ver más
                                    </button>
                                    <button className="btn btn-danger" onClick={() => eliminarPersonaje(personaje.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mostrar el modal cuando modalVisible es true */}
            {modalVisible && selectedPersonaje && (
                <PersonajeModal
                    personaje={selectedPersonaje}
                    onClose={cerrarModal}
                    onSave={actualizarPersonaje}
                />
            )}
        </div>
    );
}

export default ListaPersonajes;

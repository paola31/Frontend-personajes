import React, { useState, useEffect } from "react";
import "../assets/styles/PersonajeModal.css";

function PersonajeModal({ personaje, onClose, onSave }) {
    const [nombre, setNombre] = useState(personaje.nombre);
    const [rol, setRol] = useState(personaje.rol);
    const [descripcion, setDescripcion] = useState(personaje.descripcion);
    const [imagen, setImagen] = useState(personaje.imagen);

    useEffect(() => {
        setNombre(personaje.nombre);
        setRol(personaje.rol);
        setDescripcion(personaje.descripcion);
        setImagen(personaje.imagen);
    }, [personaje]);

    const handleSave = () => {
        const updatedPersonaje = {
            ...personaje,
            nombre,
            rol,
            descripcion,
            imagen
        };
        onSave(updatedPersonaje);
    };

    if (!personaje) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="tittle">Editar {personaje.nombre}</h2>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>
                <div className="modal-body">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="input-field"/>
                    <label>Rol:</label>
                    <input
                        type="text"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        className="input-field"/>
                    <label>Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="textarea-field"/>
                    <label>Imagen URL:</label>
                    <input
                        type="text"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        className="input-field"/>
                </div>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                    <button className="btn btn-primary" onClick={handleSave}>Guardar cambios</button>
                </div>
            </div>
        </div>
    );
}

export default PersonajeModal;

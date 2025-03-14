import React from "react";

function PersonajeModal({ personaje, onClose, onOpen }) {
    if (!personaje) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{personaje.nombre}</h2>
                <img src={personaje.imagen} alt={personaje.nombre} className="modal-image" />
                <p><strong>Identificación:</strong> {personaje.identificacion}</p>
                <p><strong>Rol:</strong> {personaje.rol}</p>
                <p><strong>Descripción:</strong> {personaje.descripcion}</p>
                <p><strong>Fecha de Creación:</strong> {new Date(personaje.fechaCreacion).toLocaleString()}</p>

                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>

                </div>
            </div>
        </div>
    );
}

export default PersonajeModal;

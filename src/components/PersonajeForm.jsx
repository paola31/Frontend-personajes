import { useState } from "react";
import "../assets/styles/PersonajeForm.css";  // Asegúrate de que la ruta sea correcta

function PersonajeForm() {
    const [personaje, setPersonaje] = useState({
        nombre: "",
        identificacion: "",
        imagen: "",
        rol: "",
        descripcion: "",
        fechaCreacion: "",
    });

    const handleChange = (e) => {
        setPersonaje({ ...personaje, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoPersonaje = {
            ...personaje,
            fechaCreacion: new Date().toISOString(),
        };

        const response = await fetch("http://localhost:8080/personajes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoPersonaje),
        });

        if (response.ok) {
            alert("Personaje agregado correctamente");
            setPersonaje({
                nombre: "",
                identificacion: "",
                imagen: "",
                rol: "",
                descripcion: "",
                fechaCreacion: "",
            });
        } else {
            alert("Error al agregar el personaje");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="tittle-h2 ">Crear Nuevo Personaje</h2>
            <form onSubmit={handleSubmit} className="formulario-container"> {/* Cambié p-4 por formulario-container */}
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        onChange={handleChange}
                        value={personaje.nombre}
                        required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Identificación</label>
                    <input
                        type="text"
                        name="identificacion"
                        className="form-control"
                        onChange={handleChange}
                        value={personaje.identificacion}
                        required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">URL de la Imagen</label>
                    <input
                        type="text"
                        name="imagen"
                        className="form-control"
                        onChange={handleChange}
                        value={personaje.imagen}/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Rol en la película</label>
                    <input
                        type="text"
                        name="rol"
                        className="form-control"
                        onChange={handleChange}
                        value={personaje.rol}/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                        name="descripcion"
                        className="form-control"
                        onChange={handleChange}
                        value={personaje.descripcion}/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Fecha de Creación</label>
                    <input
                        type="text"
                        name="fechaCreacion"
                        className="form-control"
                        value={personaje.fechaCreacion ? new Date(personaje.fechaCreacion).toLocaleString() : "Se añadirá la fecha actual"}
                        readOnly/>
                </div>

                <button type="submit" className="btn w-100">Guardar Personaje</button>
            </form>
        </div>
    );
}

export default PersonajeForm;

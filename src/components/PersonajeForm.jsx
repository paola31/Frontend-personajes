import { useState } from "react";

function PersonajeForm() {
    // Estado para almacenar los datos del formulario
    const [personaje, setPersonaje] = useState({
        nombre: "",
        identificacion: "",
        imagen: "",
        rol: "",
        descripcion: "",
        fechaCreacion: "",

    });

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setPersonaje({ ...personaje, [e.target.name]: e.target.value });
    };

    // Enviar el formulario al backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoPersonaje = {
            ...personaje,
            fechaCreacion: new Date().toISOString() // Agregar fecha actual
        };

        const response = await fetch("http://localhost:8080/personajes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoPersonaje), // Aquí usamos nuevoPersonaje en lugar de personaje
        });

        if (response.ok) {
            alert("Personaje agregado correctamente");
            // Limpiar el formulario
            setPersonaje({ nombre: "", identificacion: "", imagen: "", rol: "", descripcion: "", fechaCreacion: "",  });
        } else {
            alert("Error al agregar el personaje");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Crear Nuevo Personaje</h2>
            <form onSubmit={handleSubmit} className="card p-4">
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="nombre" className="form-control" onChange={handleChange} value={personaje.nombre} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Identificación</label>
                    <input type="text" name="identificacion" className="form-control" onChange={handleChange} value={personaje.identificacion} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">URL de la Imagen</label>
                    <input type="text" name="imagen" className="form-control" onChange={handleChange} value={personaje.imagen} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Rol en la película</label>
                    <input type="text" name="rol" className="form-control" onChange={handleChange} value={personaje.rol} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea name="descripcion" className="form-control" onChange={handleChange} value={personaje.descripcion}></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Fecha de Creación</label>
                    <input
                        type="text"
                        name="fechaCreacion"
                        className="form-control"
                        value={personaje.fechaCreacion ? new Date(personaje.fechaCreacion).toLocaleString() : "Fecha no disponible"}
                        readOnly
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Guardar Personaje</button>
            </form>
        </div>
    );


}

export default PersonajeForm;

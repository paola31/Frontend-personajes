import { useEffect, useState } from "react";

function App() {
    const [personajes, setPersonajes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/personajes")
            .then(response => response.json())
            .then(data => setPersonajes(data))
            .catch(error => console.error("Error cargando personajes:", error));
    }, []);

    return (
        <div>
            <h1>Lista de Personajes</h1>
            <ul>
                {personajes.map((personaje) => (
                    <li key={personaje.id}>
                        {personaje.nombre} - {personaje.rol}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

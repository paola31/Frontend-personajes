import { useState, useEffect } from "react";
import "../assets/styles/Home.css";
import interstellar1 from "../assets/img/inter-1.jpg";
import interstellar2 from "../assets/img/inter-2.jpg";
import interstellar3 from "../assets/img/inter-3.jpg";

const images = [interstellar1, interstellar2, interstellar3];

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container">
            <h1 className="home-title"> Bienvenido al Universo de Interstellar </h1>

            <div className="image-slider">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className={`slider-image ${index === currentIndex ? "active" : ""}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './map.css';
import { useRef, useEffect } from "react";

const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [2.16182, 41.39725],
                zoom: 11,
            });

            return () => { map.remove() }
        }

    }, []);

    return (
        <div id='map-container' ref={mapContainerRef} />
    )
};

export default Map;
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './map.css';
import { useRef, useEffect } from "react";
import locations from '../../api/locations-mockup-data.json';

const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [2.17590, 41.39003],
                zoom: 12,
            });

            locations.map(location => {
                new mapboxgl.Marker({ color: 'black' }) //marker de ejemplo
                    .setLngLat([location.lng, location.lat]) //cambiará con datos localización de la base de datos
                    .addTo(map);
            });

            return () => { map.remove() }
        }

    }, []);

    return (
        <div id='map-container' ref={mapContainerRef} />
    )
};

export default Map;
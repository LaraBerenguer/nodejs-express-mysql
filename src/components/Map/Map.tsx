import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './map.css';
import { useRef, useEffect } from "react";
import locations from '../../api/locations-mockup-data.json';
import users from '../../api/users-mockup-data.json';

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

            locations.forEach(location => {
                const user = users.find((u) => u.id_location === location.location_id);
                const gameName = user ? user.game : "No game";
                const address = user ? user.location : "No address";    

                new mapboxgl.Marker({ color: 'black' }) //marker de ejemplo
                    .setLngLat([location.lng, location.lat]) //cambiará con datos localización de la base de datos
                    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML( //popup del marker
                        `<h3>${gameName}</h3><p>${address}</p>`
                    ))
                    .addTo(map);
            })

            return () => { map.remove() }
        }

    }, []);

    return (
        <div id='map-container' ref={mapContainerRef} />
    )
};

export default Map;
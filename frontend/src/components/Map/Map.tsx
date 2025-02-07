import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocationContext } from "../../context/LocationContext";
import { Link } from "react-router-dom";

const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<{ [key: string]: mapboxgl.Marker[] }>({});
    const [filters, setFilters] = useState<{ [key: string]: boolean }>({});
    const { locations, fetchLocations } = useLocationContext();

    //Filters
    const toggleFilter = (place: string) => {
        setFilters((prev) => {
            const newFilters = { ...prev, [place]: !prev[place] };

            if (markersRef.current[place]) {
                markersRef.current[place].forEach((marker) => {
                    marker.getElement().style.display = newFilters[place] ? "block" : "none";
                });
            }

            return newFilters;
        });
    };

    useEffect(() => {
        fetchLocations();
    }, [locations]);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [2.1759, 41.39003],
            zoom: 12,
        });

        mapRef.current = map;

        map.on("load", () => {
            const groupedLocations: { [key: string]: typeof locations } = {};

            locations.forEach((location) => {
                if (!groupedLocations[location.place]) {
                    groupedLocations[location.place] = [];
                }
                groupedLocations[location.place].push(location);
            });

            //Checkboxes
            setFilters(
                Object.keys(groupedLocations).reduce((acc, place) => {
                    acc[place] = true;
                    return acc;
                }, {} as { [key: string]: boolean })
            );

            //Markers
            Object.entries(groupedLocations).forEach(([place, locations]) => {
                const color = place === "store" ? "red" : "black";

                markersRef.current[place] = locations.map((loc) => {
                    const marker = new mapboxgl.Marker({ color: `${color}` })
                        .setLngLat([loc.lng, loc.lat])
                        .setPopup(
                            new mapboxgl.Popup({ offset: 25 }).setHTML(
                                `<h3>${loc.name}</h3><p>${place}</p>`
                            )
                        )
                        .addTo(map);

                    return marker;
                });
            });
        });

        return () => map.remove();
    }, []);

    return (
        <div>
            <div className="map-elements">
                <div className="filter-group absolute right-[7.5rem] bg-white bg-opacity-50 p-2 rounded z-10 my-2">
                    {Object.keys(filters).map((place) => (
                        <label key={place} className="label cursor-pointer flex justify-end gap-2">
                            <span className="label-text text-black">{place}</span>
                            <input type="checkbox" checked={filters[place]} onChange={() => toggleFilter(place)} className="checkbox" />
                        </label>
                    ))}
                </div>
                <div id="map-container" ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />
            </div>
            <div className="map-text-elements prose my-4">
                <h3>Any fun near you?</h3>
                <p>Join a table or create your own in the <span><Link to="/calendar" className="link link-hover">Calendar</Link></span>.</p>
            </div>


        </div>
    );
};

export default Map;

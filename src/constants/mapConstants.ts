import { MarkerIconConfig } from '../types/mapTypes';

export const DEFAULT_MAP_CENTER: [number, number] = [25.73736464, 90.3644747];

export const MAP_MARKER_CONFIG: MarkerIconConfig = {
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
};

export const MAP_CONFIG = {
    MAX_LOCATIONS: 50,
    RECENT_UPDATES_LIMIT: 10,
    DEFAULT_ZOOM: 13
};
import { LocationData } from "./signalRTypes";

export interface LocationHistory extends LocationData {
    timestamp: string;
    id: string;
}

export interface MapCenter {
    lat: number;
    lon: number;
}

export interface MarkerIconConfig {
    iconUrl: string;
    shadowUrl: string;
    iconSize: [number, number];
    iconAnchor: [number, number];
    popupAnchor: [number, number];
    shadowSize: [number, number];
}
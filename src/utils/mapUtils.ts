import { Icon } from 'leaflet';
import { LocationHistory } from '../types/signalRTypes';
import { MAP_MARKER_CONFIG } from '../constants/mapConstants';

export const createDefaultIcon = () => {
    return new Icon(MAP_MARKER_CONFIG);
};

export const getUniqueUsers = (locations: LocationHistory[]): string[] => {
    return Array.from(new Set(locations.map(loc => loc.userName)));
};

export const getLatestLocationForUser = (
    locations: LocationHistory[],
    userName: string
): LocationHistory | undefined => {
    return locations.find(loc => loc.userName === userName);
};

export const formatCoordinates = (lat: number, lon: number, precision: number = 6): string => {
    return `${lat.toFixed(precision)}, ${lon.toFixed(precision)}`;
};
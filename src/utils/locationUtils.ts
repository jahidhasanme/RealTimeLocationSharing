import { MODAL_CONTENTS } from '../constants/locationConstants';
import { GeolocationState } from '../hooks/useGeolocation';
import { Location, LocationStatus, ModalContent } from '../types/locationTypes';
import { LocationData, LocationHistory } from '../types/signalRTypes';

export const generateSimulatedLocation = (center: Location): Location => {
    const radiusInDegrees = 0.01; // Approximately 1km
    const randomLat = center.lat + (Math.random() - 0.5) * 2 * radiusInDegrees;
    const randomLon = center.lon + (Math.random() - 0.5) * 2 * radiusInDegrees;
    return { lat: randomLat, lon: randomLon };
};

export const getLocationStatus = (
    useRealGPS: boolean,
    geoState: GeolocationState,
    accuracy?: number
): LocationStatus => {
    if (!useRealGPS) {
        return {
            text: 'Simulation mode',
            color: 'text-blue-600'
        };
    }

    switch (geoState) {
        case GeolocationState.Granted:
            return {
                text: `GPS Active${accuracy ? ` (±${accuracy.toFixed(0)}m accuracy)` : ''}`,
                color: 'text-green-600'
            };
        case GeolocationState.Requesting:
            return {
                text: 'Requesting GPS permission...',
                color: 'text-yellow-600'
            };
        case GeolocationState.Denied:
            return {
                text: 'GPS permission denied',
                color: 'text-red-600'
            };
        case GeolocationState.Unavailable:
            return {
                text: 'GPS unavailable',
                color: 'text-red-600'
            };
        case GeolocationState.Timeout:
            return {
                text: 'GPS timeout',
                color: 'text-red-600'
            };
        case GeolocationState.Idle:
            return {
                text: 'GPS ready',
                color: 'text-gray-600'
            };
        default:
            return {
                text: 'GPS status unknown',
                color: 'text-gray-600'
            };
    }
};

export const getModalContent = (state: GeolocationState): ModalContent => {
    return MODAL_CONTENTS[state] || MODAL_CONTENTS.default;
};

export const createLocationHistory = (data: LocationData): LocationHistory => ({
    ...data,
    timestamp: new Date().toLocaleTimeString(),
    id: Date.now().toString(),
});

export const updateLocations = (
    prevLocations: LocationHistory[],
    newLocation: LocationHistory
): LocationHistory[] => [newLocation, ...prevLocations.slice(0, 99)];
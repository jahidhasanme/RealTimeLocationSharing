import { GeolocationPosition, GeolocationState, GeolocationError } from '../types/geolocationTypes';
import { ERROR_MESSAGES } from '../constants/geolocationConstants';

export const createGeolocationPosition = (pos: globalThis.GeolocationPosition): GeolocationPosition => ({
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
    accuracy: pos.coords.accuracy,
    timestamp: pos.timestamp
});

export const getGeolocationError = (error: GeolocationPositionError): GeolocationError => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return {
                state: GeolocationState.Denied,
                message: ERROR_MESSAGES.PERMISSION_DENIED
            };
        case error.POSITION_UNAVAILABLE:
            return {
                state: GeolocationState.Unavailable,
                message: ERROR_MESSAGES.UNAVAILABLE
            };
        case error.TIMEOUT:
            return {
                state: GeolocationState.Timeout,
                message: ERROR_MESSAGES.TIMEOUT
            };
        default:
            return {
                state: GeolocationState.Denied,
                message: ERROR_MESSAGES.UNKNOWN
            };
    }
};

export const checkGeolocationSupport = (): boolean => {
    return 'geolocation' in navigator;
};
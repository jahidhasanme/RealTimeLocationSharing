export const GEOLOCATION_OPTIONS: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 30000
};

export const WATCH_POSITION_OPTIONS: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 5000
};

export const ERROR_MESSAGES = {
    PERMISSION_DENIED: 'Location permission is denied. Please enable it in your browser settings.',
    NOT_SUPPORTED: 'Geolocation is not supported by this browser',
    REQUEST_FAILED: 'Failed to request location permission',
    GET_POSITION_FAILED: 'Failed to get current position',
    WATCH_FAILED: 'Failed to start location watching',
    UNKNOWN: 'Unknown geolocation error',
    UNAVAILABLE: 'Location information unavailable',
    TIMEOUT: 'Location request timed out'
} as const;
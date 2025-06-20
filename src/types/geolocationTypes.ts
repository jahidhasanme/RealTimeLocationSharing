export interface GeolocationPosition {
    lat: number;
    lon: number;
    accuracy: number;
    timestamp: number;
}

export enum GeolocationState {
    Idle = 'idle',
    Requesting = 'requesting',
    Granted = 'granted',
    Denied = 'denied',
    Unavailable = 'unavailable',
    Timeout = 'timeout'
}

export interface GeolocationError {
    message: string;
    state: GeolocationState;
}

export interface UseGeolocationReturn {
    position: GeolocationPosition | null;
    state: GeolocationState;
    error: string | null;
    isWatching: boolean;
    accuracy: number;
    requestPermission: () => Promise<boolean>;
    getCurrentPosition: () => Promise<GeolocationPosition>;
    startWatching: () => Promise<boolean>;
    stopWatching: () => void;
}
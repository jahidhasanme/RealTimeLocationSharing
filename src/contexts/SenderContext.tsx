import { createContext, useContext, useState, useCallback } from 'react';
import { useSignalR } from '../hooks/useSignalR';
import { useGeolocation, GeolocationState } from '../hooks/useGeolocation';
import { generateSimulatedLocation } from '../utils/locationUtils';
import { SIMULATION_CENTER, LOCATION_UPDATE_INTERVAL, ERROR_MESSAGES } from '../constants/locationConstants';
import { Location } from '../types/locationTypes';
import { useAsyncEffect } from '../hooks/useAsyncEffect';

interface SenderContextType {
    userName: string;
    setUserName: (name: string) => void;
    isSharing: boolean;
    useRealGPS: boolean;
    lastSentLocation: Location | null;
    showPermissionModal: boolean;
    connectionState: string;
    geoState: GeolocationState;
    geoError: string | null;
    accuracy: number;
    isWatching: boolean;
    handleLocationModeChange: (useGPS: boolean) => Promise<void>;
    shareLocationOnce: () => Promise<void>;
    startLiveSharing: () => Promise<void>;
    stopLiveSharing: () => void;
    handlePermissionGranted: () => void;
    handleUseSimulation: () => void;
    setShowPermissionModal: (show: boolean) => void;
    requestPermission: () => Promise<boolean>;
}

const SenderContext = createContext<SenderContextType | undefined>(undefined);

export const SenderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { connectionState, sendLocation, connect, disconnect } = useSignalR();
    const {
        position,
        state: geoState,
        error: geoError,
        isWatching,
        requestPermission,
        getCurrentPosition,
        startWatching,
        stopWatching,
        accuracy
    } = useGeolocation();

    const [userName, setUserName] = useState('');
    const [isSharing, setIsSharing] = useState(false);
    const [useRealGPS, setUseRealGPS] = useState(true);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [lastSentLocation, setLastSentLocation] = useState<Location | null>(null);

    useAsyncEffect(async () => {
        await connect();

        return async () => {
            await disconnect();
            stopWatching();
            if ((window as any).locationInterval) {
                clearInterval((window as any).locationInterval);
                (window as any).locationInterval = null;
            }
        };
    }, [connect, disconnect, stopWatching]);

    const handleLocationModeChange = useCallback(async (useGPS: boolean) => {
        if (useGPS) {
            if (geoState === GeolocationState.Granted) {
                setUseRealGPS(true);
            } else {
                setShowPermissionModal(true);
            }
        } else {
            setUseRealGPS(false);
            stopWatching();
        }
    }, [geoState, stopWatching]);

    const handlePermissionGranted = useCallback(() => {
        setUseRealGPS(true);
        setShowPermissionModal(false);
    }, []);

    const handleUseSimulation = useCallback(() => {
        setUseRealGPS(false);
        setShowPermissionModal(false);
    }, []);

    const shareLocationOnce = async () => {
        if (!userName.trim()) {
            alert(ERROR_MESSAGES.NO_USERNAME);
            return;
        }

        try {
            let location;
            if (useRealGPS) {
                if (geoState !== GeolocationState.Granted) {
                    setShowPermissionModal(true);
                    return;
                }
                location = await getCurrentPosition();
                setLastSentLocation({ lat: location.lat, lon: location.lon });
            } else {
                location = generateSimulatedLocation(SIMULATION_CENTER);
                setLastSentLocation(location);
            }

            await sendLocation(location.lat, location.lon, userName);
        } catch (error) {
            console.error('Failed to get/send location:', error);
            alert('Failed to get location. Please try again.');
        }
    };

    const startLiveSharing = async () => {
        if (!userName.trim()) {
            alert(ERROR_MESSAGES.NO_USERNAME);
            return;
        }

        if (useRealGPS) {
            if (geoState !== GeolocationState.Granted) {
                setShowPermissionModal(true);
                return;
            }

            const success = await startWatching();
            if (!success) {
                alert('Failed to start location tracking. Please check permissions.');
                return;
            }
        }

        setIsSharing(true);

        const interval = setInterval(async () => {
            try {
                let location;
                if (useRealGPS && position) {
                    location = { lat: position.lat, lon: position.lon };
                } else if (!useRealGPS) {
                    location = generateSimulatedLocation(SIMULATION_CENTER);
                } else {
                    return;
                }

                setLastSentLocation(location);
                await sendLocation(location.lat, location.lon, userName);
            } catch (error) {
                console.error('Failed to send location during live sharing:', error);
            }
        }, LOCATION_UPDATE_INTERVAL);

        (window as any).locationInterval = interval;
    };

    const stopLiveSharing = useCallback(() => {
        setIsSharing(false);
        stopWatching();

        if ((window as any).locationInterval) {
            clearInterval((window as any).locationInterval);
            (window as any).locationInterval = null;
        }
    }, [stopWatching]);

    const handleRequestPermission = useCallback(async () => {
        const granted = await requestPermission();
        if (granted) {
            handlePermissionGranted();
        }
        return granted;
    }, [requestPermission, handlePermissionGranted]);

    const value = {
        userName,
        setUserName,
        isSharing,
        useRealGPS,
        lastSentLocation,
        showPermissionModal,
        connectionState,
        geoState,
        geoError,
        accuracy,
        isWatching,
        handleLocationModeChange,
        shareLocationOnce,
        startLiveSharing,
        stopLiveSharing,
        handlePermissionGranted,
        handleUseSimulation,
        setShowPermissionModal,
        requestPermission: handleRequestPermission,
    };

    return (
        <SenderContext.Provider value={value}>
            {children}
        </SenderContext.Provider>
    );
};

export const useSender = () => {
    const context = useContext(SenderContext);
    if (context === undefined) {
        throw new Error('useSender must be used within a SenderProvider');
    }
    return context;
};
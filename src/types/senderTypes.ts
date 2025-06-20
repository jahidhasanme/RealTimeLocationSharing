import { ConnectionState } from './connectionTypes';
import { GeolocationState } from '../hooks/useGeolocation';
import { Location } from './locationTypes';

export interface SenderContextType {
    userName: string;
    setUserName: (name: string) => void;
    isSharing: boolean;
    useRealGPS: boolean;
    lastSentLocation: Location | null;
    showPermissionModal: boolean;
    connectionState: ConnectionState;
    geoState: GeolocationState;
    geoError: string | null;
    accuracy: number;
    isWatching: boolean;
    handleLocationModeChange: (useGPS: boolean) => Promise<void>;
    shareLocationOnce: () => Promise<void>;
    startLiveSharing: () => Promise<void>;
    stopLiveSharing: () => void;
    handleUseSimulation: () => void;
    setShowPermissionModal: (show: boolean) => void;
    requestPermission: () => Promise<boolean>;
}
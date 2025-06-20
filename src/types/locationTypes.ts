import { GeolocationState } from '../hooks/useGeolocation';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { LocationHistory, LocationData } from './signalRTypes';

export interface Location {
    lat: number;
    lon: number;
}

export interface LocationStatus {
    text: string;
    color: string;
}

export interface LocationPermissionModalProps {
    isOpen: boolean;
    state: GeolocationState;
    error: string | null;
    onRequestPermission: () => void;
    onClose: () => void;
    onUseSimulation: () => void;
}

export interface ModalContent {
    icon: LucideIcon;
    title: string;
    message: string;
    showActions: boolean;
    iconColor: string;
    bgColor: string;
    showSettings?: boolean;
}

export interface LocationContextType {
    locations: LocationHistory[];
    mapCenter: [number, number];
    addLocation: (data: LocationData) => void;
    setMapCenter: (center: [number, number]) => void;
}

export interface LocationProviderProps {
    children: ReactNode;
}
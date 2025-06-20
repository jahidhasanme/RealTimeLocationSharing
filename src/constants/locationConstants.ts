import { MapPin, Shield, AlertCircle } from 'lucide-react';
import { GeolocationState } from '../hooks/useGeolocation';
import { ModalContent } from '../types/locationTypes';

export const SIMULATION_CENTER = {
    lat: 25.73736464,
    lon: 90.3644747 // Dhaka, Bangladesh
};

export const LOCATION_UPDATE_INTERVAL = 2000; // 2 seconds

export const ERROR_MESSAGES = {
    NO_USERNAME: 'Please enter your email/username first',
    LOCATION_TRACKING_FAILED: 'Failed to start location tracking. Please check permissions.',
    LOCATION_SEND_FAILED: 'Failed to get location. Please try again.'
};

export const MODAL_CONTENTS: Record<GeolocationState | 'default', ModalContent> = {
    [GeolocationState.Requesting]: {
        icon: Shield,
        title: 'Requesting Location Permission',
        message: 'Please allow location access in your browser to share your real-time location.',
        showActions: false,
        iconColor: 'text-blue-500',
        bgColor: 'bg-blue-50'
    },
    [GeolocationState.Denied]: {
        icon: AlertCircle,
        title: 'Location Permission Denied',
        message: 'To use real GPS, please enable location access in your browser settings and refresh the page.',
        showActions: true,
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50',
        showSettings: true
    },
    [GeolocationState.Unavailable]: {
        icon: AlertCircle,
        title: 'Location Unavailable',
        message: 'Your browser or device does not support location services.',
        showActions: true,
        iconColor: 'text-orange-500',
        bgColor: 'bg-orange-50'
    },
    [GeolocationState.Timeout]: {
        icon: AlertCircle,
        title: 'Location Request Timeout',
        message: 'Unable to get your location. This might be due to poor GPS signal or network issues.',
        showActions: true,
        iconColor: 'text-yellow-500',
        bgColor: 'bg-yellow-50'
    },
    [GeolocationState.Idle]: {
        icon: MapPin,
        title: 'Location Idle',
        message: 'Location permission has not been requested yet.',
        showActions: true,
        iconColor: 'text-gray-500',
        bgColor: 'bg-gray-50'
    },
    [GeolocationState.Granted]: {
        icon: MapPin,
        title: 'Location Permission Granted',
        message: 'Your location is being shared in real-time.',
        showActions: false,
        iconColor: 'text-green-600',
        bgColor: 'bg-green-100'
    },
    default: {
        icon: MapPin,
        title: 'Enable Location Sharing',
        message: 'Allow access to your location to share real-time GPS coordinates with others.',
        showActions: true,
        iconColor: 'text-green-500',
        bgColor: 'bg-green-50'
    }
};
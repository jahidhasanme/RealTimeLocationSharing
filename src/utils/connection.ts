import { Wifi, WifiOff, RotateCw, AlertTriangle } from 'lucide-react';
import { ConnectionState, ConnectionStatusConfig } from '../types/connectionTypes';

export const getConnectionStatusConfig = (state: ConnectionState): ConnectionStatusConfig => {
    switch (state) {
        case ConnectionState.Connected:
            return {
                icon: Wifi,
                text: 'Connected',
                color: 'text-green-600',
                bgColor: 'bg-green-100',
                animate: false
            };
        case ConnectionState.Connecting:
            return {
                icon: RotateCw,
                text: 'Connecting',
                color: 'text-blue-600',
                bgColor: 'bg-blue-100',
                animate: true
            };
        case ConnectionState.Reconnecting:
            return {
                icon: RotateCw,
                text: 'Reconnecting',
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-100',
                animate: true
            };
        case ConnectionState.Failed:
            return {
                icon: AlertTriangle,
                text: 'Connection Failed',
                color: 'text-red-600',
                bgColor: 'bg-red-100',
                animate: false
            };
        default:
            return {
                icon: WifiOff,
                text: 'Disconnected',
                color: 'text-gray-600',
                bgColor: 'bg-gray-100',
                animate: false
            };
    }
};
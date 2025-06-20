
import { Wifi, WifiOff, RotateCw, AlertTriangle } from 'lucide-react';
import { getConnectionStatusConfig } from '../connection';
import { ConnectionState } from '../../types/signalRTypes';

describe('getConnectionStatusConfig', () => {
    test('returns correct config for Connected state', () => {
        const config = getConnectionStatusConfig(ConnectionState.Connected);
        expect(config).toEqual({
            icon: Wifi,
            text: 'Connected',
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            animate: false
        });
    });

    test('returns correct config for Connecting state', () => {
        const config = getConnectionStatusConfig(ConnectionState.Connecting);
        expect(config).toEqual({
            icon: RotateCw,
            text: 'Connecting',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            animate: true
        });
    });

    test('returns correct config for Reconnecting state', () => {
        const config = getConnectionStatusConfig(ConnectionState.Reconnecting);
        expect(config).toEqual({
            icon: RotateCw,
            text: 'Reconnecting',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100',
            animate: true
        });
    });

    test('returns correct config for Failed state', () => {
        const config = getConnectionStatusConfig(ConnectionState.Failed);
        expect(config).toEqual({
            icon: AlertTriangle,
            text: 'Connection Failed',
            color: 'text-red-600',
            bgColor: 'bg-red-100',
            animate: false
        });
    });

    test('returns correct config for Disconnected state', () => {
        const config = getConnectionStatusConfig(ConnectionState.Disconnected);
        expect(config).toEqual({
            icon: WifiOff,
            text: 'Disconnected',
            color: 'text-gray-600',
            bgColor: 'bg-gray-100',
            animate: false
        });
    });
});
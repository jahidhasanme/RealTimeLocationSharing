import * as signalR from '@microsoft/signalr';

export interface LocationData {
    lat: number;
    lon: number;
    userName: string;
    accuracy?: number;
}

export interface LocationHistory extends LocationData {
    id: string;
    timestamp: string;
}

export enum ConnectionState {
    Disconnected = 'Disconnected',
    Connecting = 'Connecting',
    Connected = 'Connected',
    Reconnecting = 'Reconnecting',
    Failed = 'Failed'
}

export interface UseSignalRReturn {
    connection: signalR.HubConnection | null;
    connectionState: ConnectionState;
    connectionError: string | null;
    sendLocation: (lat: number, lon: number, userName: string) => Promise<void>;
    onLocationReceived: (callback: (data: LocationData) => void) => void;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
}
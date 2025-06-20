import { HttpTransportType } from '@microsoft/signalr';

export const HUB_URL = 'https://tech-test.raintor.com/Hub';

export const CONNECTION_CONFIG = {
    skipNegotiation: false,
    transport: HttpTransportType.WebSockets | HttpTransportType.ServerSentEvents | HttpTransportType.LongPolling
};

export const RETRY_POLICY = {
    maxRetries: 3,
    maxDelayMs: 10000
};

export const ERROR_MESSAGES = {
    UNKNOWN: 'Unknown connection error',
    NETWORK: 'Unable to connect to server. Please check if the server is running and accessible.',
    CORS: 'Cross-origin request blocked. Please check server CORS configuration.',
    NOT_CONNECTED: 'Cannot send location: Not connected to server',
    SEND_FAILED: 'Failed to send location',
    CONNECTION_CLOSED: 'Connection closed',
    RECONNECTING: 'Reconnecting to server'
} as const;
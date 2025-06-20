
import * as signalR from '@microsoft/signalr';
import { createHubConnection, getFormattedError } from '../signalRUtils';
import { CONNECTION_CONFIG, ERROR_MESSAGES } from '../../constants/signalRConstants';

jest.mock('@microsoft/signalr', () => ({
    HttpTransportType: {
        WebSockets: 1,
        ServerSentEvents: 2,
        LongPolling: 4
    },
    HubConnectionBuilder: jest.fn().mockReturnValue({
        withUrl: jest.fn().mockReturnThis(),
        withAutomaticReconnect: jest.fn().mockReturnThis(),
        configureLogging: jest.fn().mockReturnThis(),
        build: jest.fn().mockReturnValue({
            state: 0,
            start: jest.fn(),
            stop: jest.fn()
        })
    }),
    LogLevel: { Information: 1 }
}));

describe('signalRUtils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('creates hub connection with correct configuration', () => {
        const hubUrl = 'http://localhost:5000/hub';
        const connection = createHubConnection(hubUrl);

        expect(connection).toBeDefined();
        expect(signalR.HubConnectionBuilder).toHaveBeenCalled();
        const mockHubBuilder = (signalR.HubConnectionBuilder as jest.Mock)();
        expect(mockHubBuilder.withUrl).toHaveBeenCalledWith(hubUrl, CONNECTION_CONFIG);
        expect(mockHubBuilder.withAutomaticReconnect).toHaveBeenCalled();
        expect(mockHubBuilder.configureLogging).toHaveBeenCalledWith(signalR.LogLevel.Information);
        expect(mockHubBuilder.build).toHaveBeenCalled();
    });

    test('formats network error correctly', () => {
        const error = new Error('Failed to fetch');
        expect(getFormattedError(error)).toBe(ERROR_MESSAGES.NETWORK);
    });

    test('formats CORS error', () => {
        const error = new Error('CORS error occurred');
        expect(getFormattedError(error)).toBe(ERROR_MESSAGES.CORS);
    });

    test('returns original message for other errors', () => {
        const error = new Error('Custom error');
        expect(getFormattedError(error)).toBe('Custom error');
    });

    test('returns unknown error for non-Error objects', () => {
        expect(getFormattedError('string error')).toBe(ERROR_MESSAGES.UNKNOWN);
    });
});
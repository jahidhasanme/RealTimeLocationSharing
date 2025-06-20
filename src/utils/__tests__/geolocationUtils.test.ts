import { ERROR_MESSAGES } from "../../constants/geolocationConstants";
import { GeolocationState } from "../../types/geolocationTypes";
import { checkGeolocationSupport, createGeolocationPosition, getGeolocationError } from "../geolocationUtils";


describe('geolocationUtils', () => {
    describe('createGeolocationPosition', () => {
        test('creates position object with correct format', () => {
            const mockPosition = {
                coords: {
                    latitude: 51.5074,
                    longitude: -0.1278,
                    accuracy: 10,
                    altitude: null,
                    altitudeAccuracy: null,
                    heading: null,
                    speed: null
                },
                timestamp: 1623456789000,
                toJSON: () => ({})
            } as GeolocationPosition;

            const position = createGeolocationPosition(mockPosition);

            expect(position).toEqual({
                lat: 51.5074,
                lon: -0.1278,
                accuracy: 10,
                timestamp: 1623456789000
            });
        });
    });

    describe('getGeolocationError', () => {
        const createMockError = (code: number): GeolocationPositionError => ({
            code,
            message: 'Test error',
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3
        });

        test('handles permission denied error', () => {
            const error = getGeolocationError(createMockError(1));
            expect(error).toEqual({
                state: GeolocationState.Denied,
                message: ERROR_MESSAGES.PERMISSION_DENIED
            });
        });

        test('handles position unavailable error', () => {
            const error = getGeolocationError(createMockError(2));
            expect(error).toEqual({
                state: GeolocationState.Unavailable,
                message: ERROR_MESSAGES.UNAVAILABLE
            });
        });

        test('handles timeout error', () => {
            const error = getGeolocationError(createMockError(3));
            expect(error).toEqual({
                state: GeolocationState.Timeout,
                message: ERROR_MESSAGES.TIMEOUT
            });
        });

        test('handles unknown error', () => {
            const error = getGeolocationError(createMockError(4));
            expect(error).toEqual({
                state: GeolocationState.Denied,
                message: ERROR_MESSAGES.UNKNOWN
            });
        });
    });

    describe('checkGeolocationSupport', () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn(),
            watchPosition: jest.fn(),
            clearWatch: jest.fn()
        };

        beforeAll(() => {
            Object.defineProperty(global.navigator, 'geolocation', {
                value: mockGeolocation,
                configurable: true,
                writable: true
            });
        });

        test('returns true when geolocation is supported', () => {
            expect('geolocation' in navigator).toBe(true);
            expect(checkGeolocationSupport()).toBe(true);
        });

        test('returns false when geolocation is not supported', () => {
            const tempNavigator = { ...navigator };
            delete (tempNavigator as any).geolocation;

            Object.defineProperty(global, 'navigator', {
                value: tempNavigator,
                configurable: true,
                writable: true
            });

            expect(checkGeolocationSupport()).toBe(false);


            Object.defineProperty(global, 'navigator', {
                value: navigator,
                configurable: true,
                writable: true
            });
        });
    });
});
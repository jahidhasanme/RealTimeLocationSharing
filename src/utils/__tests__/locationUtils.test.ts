import { MODAL_CONTENTS } from "../../constants/locationConstants";
import { GeolocationState } from "../../types/geolocationTypes";
import { createLocationHistory, generateSimulatedLocation, getLocationStatus, getModalContent, updateLocations } from "../locationUtils";


describe('locationUtils', () => {
    describe('generateSimulatedLocation', () => {
        const center = { lat: 0, lon: 0 };

        test('generates location within radius', () => {
            const location = generateSimulatedLocation(center);
            expect(location.lat).toBeGreaterThanOrEqual(-0.01);
            expect(location.lat).toBeLessThanOrEqual(0.01);
            expect(location.lon).toBeGreaterThanOrEqual(-0.01);
            expect(location.lon).toBeLessThanOrEqual(0.01);
        });

        test('generates different locations', () => {
            const loc1 = generateSimulatedLocation(center);
            const loc2 = generateSimulatedLocation(center);
            expect(loc1).not.toEqual(loc2);
        });
    });

    describe('getLocationStatus', () => {
        test('returns simulation mode status when not using real GPS', () => {
            const status = getLocationStatus(false, GeolocationState.Granted);
            expect(status).toEqual({
                text: 'Simulation mode',
                color: 'text-blue-600'
            });
        });

        test('returns correct status for granted permission', () => {
            const status = getLocationStatus(true, GeolocationState.Granted, 10);
            expect(status).toEqual({
                text: 'GPS Active (±10m accuracy)',
                color: 'text-green-600'
            });
        });

        test('returns correct status for denied permission', () => {
            const status = getLocationStatus(true, GeolocationState.Denied);
            expect(status).toEqual({
                text: 'GPS permission denied',
                color: 'text-red-600'
            });
        });
    });

    describe('getModalContent', () => {
        test('returns correct content for each state', () => {
            Object.values(GeolocationState).forEach(state => {
                const content = getModalContent(state);
                expect(content).toBeDefined();
            });
        });

        test('returns default content for unknown state', () => {
            const content = getModalContent('unknown' as GeolocationState);
            expect(content).toEqual(MODAL_CONTENTS.default);
        });
    });

    describe('createLocationHistory', () => {
        test('creates location history with correct format', () => {
            const data = { lat: 0, lon: 0, userName: 'test' };
            const history = createLocationHistory(data);

            expect(history).toMatchObject({
                ...data,
                id: expect.any(String),
                timestamp: expect.any(String)
            });
        });
    });

    describe('updateLocations', () => {
        test('adds new location at beginning of array', () => {
            const prevLocations = [{ id: '1', lat: 0, lon: 0, userName: 'test', timestamp: '12:00' }];
            const newLocation = { id: '2', lat: 1, lon: 1, userName: 'test', timestamp: '12:01' };

            const updated = updateLocations(prevLocations, newLocation);

            expect(updated[0]).toEqual(newLocation);
            expect(updated.length).toBe(2);
        });

        test('limits array to 100 items', () => {
            const prevLocations = Array(100).fill(null).map((_, i) => ({
                id: i.toString(),
                lat: 0,
                lon: 0,
                userName: 'test',
                timestamp: '12:00'
            }));
            const newLocation = {
                id: '101',
                lat: 1,
                lon: 1,
                userName: 'test',
                timestamp: '12:01'
            };

            const updated = updateLocations(prevLocations, newLocation);

            expect(updated.length).toBe(100);
            expect(updated[0]).toEqual(newLocation);
        });
    });
});
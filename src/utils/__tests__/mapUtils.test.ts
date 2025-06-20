import { createDefaultIcon, getUniqueUsers, getLatestLocationForUser, formatCoordinates } from '../mapUtils';
import { Icon } from 'leaflet';

describe('mapUtils', () => {
    const mockLocations = [
        { id: '1', userName: 'user1', lat: 0, lon: 0, timestamp: '12:00' },
        { id: '2', userName: 'user2', lat: 1, lon: 1, timestamp: '12:01' },
        { id: '3', userName: 'user1', lat: 2, lon: 2, timestamp: '12:02' }
    ];

    describe('createDefaultIcon', () => {
        test('creates Leaflet icon with correct configuration', () => {
            const icon = createDefaultIcon();
            expect(icon).toBeInstanceOf(Icon);
        });
    });

    describe('getUniqueUsers', () => {
        test('returns array of unique usernames', () => {
            const users = getUniqueUsers(mockLocations);
            expect(users).toEqual(['user1', 'user2']);
            expect(users.length).toBe(2);
        });

        test('returns empty array for empty locations', () => {
            const users = getUniqueUsers([]);
            expect(users).toEqual([]);
        });
    });

    describe('getLatestLocationForUser', () => {
        test('returns latest location for user', () => {
            const location = getLatestLocationForUser(mockLocations, 'user1');
            expect(location).toEqual(mockLocations[0]);
        });

        test('returns undefined for non-existent user', () => {
            const location = getLatestLocationForUser(mockLocations, 'user3');
            expect(location).toBeUndefined();
        });
    });

    describe('formatCoordinates', () => {
        test('formats coordinates with default precision', () => {
            const formatted = formatCoordinates(12.345678, -98.765432);
            expect(formatted).toBe('12.345678, -98.765432');
        });

        test('formats coordinates with custom precision', () => {
            const formatted = formatCoordinates(12.345678, -98.765432, 2);
            expect(formatted).toBe('12.35, -98.77');
        });
    });
});
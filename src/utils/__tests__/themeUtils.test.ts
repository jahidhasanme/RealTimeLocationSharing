import { getInitialTheme, updateThemeInDOM } from "../themeUtils";


describe('themeUtils', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    describe('getInitialTheme', () => {
        test('returns saved theme from localStorage', () => {
            const getItemSpy = jest.spyOn(localStorage, 'getItem') as jest.SpyInstance;

            getItemSpy.mockReturnValueOnce('dark');
            expect(getInitialTheme()).toBe(true);

            getItemSpy.mockReturnValueOnce('light');
            expect(getInitialTheme()).toBe(false);

            getItemSpy.mockRestore();
        });
    });

    describe('updateThemeInDOM', () => {
        test('updates DOM and localStorage for dark mode', () => {
            const setItemSpy = jest.spyOn(localStorage, 'setItem');

            updateThemeInDOM(true);
            expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
            expect(document.documentElement.classList.contains('dark')).toBe(true);

            setItemSpy.mockRestore();
        });

        test('updates DOM and localStorage for light mode', () => {
            const setItemSpy = jest.spyOn(localStorage, 'setItem');

            updateThemeInDOM(false);
            expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
            expect(document.documentElement.classList.contains('dark')).toBe(false);

            setItemSpy.mockRestore();
        });
    });
});
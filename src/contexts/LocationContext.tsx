import React, { createContext, useContext, useState } from 'react';
import { LocationContextType, LocationProviderProps } from '../types/locationTypes';
import { LocationData, LocationHistory } from '../types/signalRTypes';
import { createLocationHistory, updateLocations } from '../utils/locationUtils';
import { DEFAULT_MAP_CENTER } from '../constants/mapConstants';

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
    const [locations, setLocations] = useState<LocationHistory[]>([]);
    const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_MAP_CENTER);

    const addLocation = (data: LocationData) => {
        const newLocation = createLocationHistory(data);
        setLocations(prev => updateLocations(prev, newLocation));
        setMapCenter([data.lat, data.lon]);
    };

    return (
        <LocationContext.Provider value={{ locations, mapCenter, addLocation, setMapCenter }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};
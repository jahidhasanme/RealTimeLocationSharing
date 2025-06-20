import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useSignalR } from '../hooks/useSignalR';
import { useLocation } from './LocationContext';
import { ConnectionState } from '../types/connectionTypes';
import { createDefaultIcon } from '../utils/mapUtils';

interface ReceiverContextType {
    connectionState: ConnectionState;
    defaultIcon: L.Icon;
}

const ReceiverContext = createContext<ReceiverContextType | undefined>(undefined);

export const ReceiverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { connectionState, onLocationReceived, connect, disconnect } = useSignalR();
    const { addLocation } = useLocation();
    const defaultIcon = createDefaultIcon();
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            connect();
            onLocationReceived(addLocation);
        }

        return () => {
            hasInitialized.current = false;
            disconnect();
        };
    }, [connect, disconnect, onLocationReceived, addLocation]);

    const value = {
        connectionState,
        defaultIcon
    };

    return (
        <ReceiverContext.Provider value={value}>
            {children}
        </ReceiverContext.Provider>
    );
};

export const useReceiver = () => {
    const context = useContext(ReceiverContext);
    if (context === undefined) {
        throw new Error('useReceiver must be used within a ReceiverProvider');
    }
    return context;
};
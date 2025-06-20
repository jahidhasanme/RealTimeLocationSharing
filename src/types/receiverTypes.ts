import { ReactNode } from 'react';
import { ConnectionState } from './connectionTypes';

export interface ReceiverProviderProps {
    children: ReactNode;
}

export interface ReceiverContextType {
    connectionState: ConnectionState;
    defaultIcon: L.Icon;
}
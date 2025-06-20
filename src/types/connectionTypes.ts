import { LucideIcon } from 'lucide-react';

export enum ConnectionState {
  Connected = 'Connected',
  Connecting = 'Connecting',
  Disconnected = 'Disconnected',
  Failed = 'Failed',
  Reconnecting = 'Reconnecting'
}

export interface ConnectionStatusConfig {
    icon: LucideIcon;
    text: string;
    color: string;
    bgColor: string;
    animate: boolean;
}

export interface ConnectionStatusProps {
    state: ConnectionState;
}
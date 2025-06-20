import React from 'react';
import { ConnectionStatusProps } from '../types/connectionTypes';
import { getConnectionStatusConfig } from '../utils/connection';

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ state }) => {
  const { icon: Icon, text, color, bgColor, animate } = getConnectionStatusConfig(state);

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${bgColor} ${color}`}>
      <Icon size={16} className={animate ? 'animate-spin' : ''} />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};
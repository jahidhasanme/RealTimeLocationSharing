import React from 'react';
import { MapPin, Settings, RotateCw } from 'lucide-react';
import { GeolocationState } from '../hooks/useGeolocation';
import { LocationPermissionModalProps } from '../types/locationTypes';
import { getModalContent } from '../utils/locationUtils';

export const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
  isOpen,
  state,
  error,
  onRequestPermission,
  onClose,
  onUseSimulation
}) => {
  if (!isOpen) return null;

  const { icon: Icon, title, message, showActions, iconColor, bgColor, showSettings } = getModalContent(state);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
        <div className={`${bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
          <Icon size={28} className={iconColor} />
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-3">
          {title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
          {message}
        </p>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        {showActions && (
          <div className="space-y-3">
            {state !== GeolocationState.Denied && state !== GeolocationState.Unavailable && (
              <button
                onClick={onRequestPermission}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MapPin size={18} />
                Allow Location Access
              </button>
            )}

            {showSettings && (
              <div className="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Settings size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    <p className="font-medium mb-1">To enable location:</p>
                    <ol className="list-decimal list-inside space-y-1 text-xs">
                      <li>Click the location icon in your browser's address bar</li>
                      <li>Select "Allow" for location access</li>
                      <li>Refresh this page</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={onUseSimulation}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all"
            >
              Use Simulated Location Instead
            </button>

            <button
              onClick={onClose}
              className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium py-2 transition-all"
            >
              Cancel
            </button>
          </div>
        )}

        {state === GeolocationState.Requesting && (
          <div className="flex justify-center">
            <RotateCw 
              className="animate-spin" 
              size={24} 
              role="status"
              aria-label="Loading"
            />
          </div>
        )}
      </div>
    </div>
  );
};
import { MapPin, Play, Square, User, Satellite, Navigation } from 'lucide-react';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { LocationPermissionModal } from '../components/LocationPermissionModal';
import { useSender } from '../contexts/SenderContext';
import { GeolocationState } from '../hooks/useGeolocation';
import { getLocationStatus } from '../utils/locationUtils';
import { ConnectionState } from '../types/connectionTypes';
import { useAsyncEffect } from '../hooks/useAsyncEffect';

export const Sender: React.FC = () => {
  const {
    userName,
    setUserName,
    isSharing,
    useRealGPS,
    lastSentLocation,
    showPermissionModal,
    connectionState,
    geoState,
    geoError,
    accuracy,
    isWatching,
    handleLocationModeChange,
    shareLocationOnce,
    startLiveSharing,
    stopLiveSharing,
    handleUseSimulation,
    setShowPermissionModal,
    requestPermission
  } = useSender();

  useAsyncEffect(async () => {
    return async () => {
      await stopLiveSharing();
    };
  }, [stopLiveSharing]);

  const locationStatus = getLocationStatus(useRealGPS, geoState, accuracy);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 dark:bg-blue-600 text-white rounded-full">
              <User size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Location Sender</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Share your location in real-time</p>
        </div>

        <div className="flex justify-center mb-6">
          <ConnectionStatus state={connectionState as ConnectionState} />
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 mb-6">

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Email/Username
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Location Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Use Real GPS</span>
                {useRealGPS && geoState === GeolocationState.Granted && (
                  <Satellite size={16} className="text-green-600 dark:text-green-500" />
                )}
              </div>
              <button
                data-testid="gps-toggle"
                onClick={() => handleLocationModeChange(!useRealGPS)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${useRealGPS ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
              >
                <Satellite size={20} />
                Use Real GPS
              </button>
            </div>

            {/* Location Status */}
            <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Navigation size={16} className={locationStatus.color} />
                <span className={`text-sm font-medium ${locationStatus.color}`}>
                  {locationStatus.text}
                </span>
              </div>
              {geoError && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{geoError}</p>
              )}
            </div>

            {!useRealGPS && (
              <div className="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Simulation Mode:</strong> Using coordinates around Dhaka, Bangladesh
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Current Location Card */}
        {lastSentLocation && (
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={20} className="text-green-600 dark:text-green-500" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Last Sent Location</h3>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p><strong>Latitude:</strong> {lastSentLocation.lat.toFixed(6)}</p>
              <p><strong>Longitude:</strong> {lastSentLocation.lon.toFixed(6)}</p>
              {useRealGPS && (
                <p><strong>Accuracy:</strong> ±{accuracy.toFixed(0)} meters</p>
              )}
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="space-y-3">
          <button
            onClick={shareLocationOnce}
            disabled={!userName.trim() || isSharing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <MapPin size={20} />
            Send Location Once
          </button>

          {!isSharing ? (
            <button
              onClick={startLiveSharing}
              disabled={!userName.trim()}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Play size={20} />
              Start Live Sharing
            </button>
          ) : (
            <button
              onClick={stopLiveSharing}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Square size={20} />
              Stop Live Sharing
            </button>
          )}
        </div>

        {/* Live Sharing Indicator */}
        {isSharing && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {useRealGPS && isWatching ? 'Live GPS sharing active' : 'Live sharing active'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Permission Modal */}
      <LocationPermissionModal
        isOpen={showPermissionModal}
        state={geoState}
        error={geoError}
        onRequestPermission={requestPermission}
        onClose={() => setShowPermissionModal(false)}
        onUseSimulation={handleUseSimulation}
      />
    </div>
  );
};
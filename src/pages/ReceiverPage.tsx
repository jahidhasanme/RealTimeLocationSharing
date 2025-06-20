import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Users, Clock } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useReceiver } from '../contexts/ReceiverContext';
import { getUniqueUsers, getLatestLocationForUser, formatCoordinates } from '../utils/mapUtils';
import 'leaflet/dist/leaflet.css';

export const Receiver: React.FC = () => {
  const { locations, mapCenter } = useLocation();
  const { defaultIcon } = useReceiver();
  const uniqueUsers = getUniqueUsers(locations);
  const activeUsers = [...new Set(locations.map(loc => loc.userName))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div data-testid="active-users-section" className="max-w-md mx-auto">
        <h2>Active Users</h2>
        <div className="mt-4">
          {activeUsers.map(user => (
            <div key={user} className="p-2 bg-white dark:bg-gray-800 rounded-lg mb-2">
              {user}
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <MapPin size={20} className="text-purple-600 dark:text-purple-400" />
                  Live Map
                </h2>
              </div>
              <div className="h-96 lg:h-[500px]">
                <MapContainer
                  center={mapCenter || [0, 0]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  key={`${mapCenter?.[0] ?? 0}-${mapCenter?.[1] ?? 0}`}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {uniqueUsers.map(userName => {
                    const location = getLatestLocationForUser(locations, userName);
                    if (!location) return null;

                    return (
                      <Marker
                        key={location.id}
                        position={[location.lat, location.lon]}
                        icon={defaultIcon}
                      >
                        <Popup>
                          <div className="text-center">
                            <p className="font-semibold">{location.userName}</p>
                            <p className="text-sm text-gray-600">
                              {formatCoordinates(location.lat, location.lon)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Last updated: {location.timestamp}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {uniqueUsers.length > 0 && (
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Active Users</h3>
                <div className="space-y-2">
                  {uniqueUsers.map(userName => {
                    const location = getLatestLocationForUser(locations, userName);
                    return (
                      <div
                        key={userName}
                        className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 dark:text-white truncate">{userName}</p>
                          {location && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Last update: {location.timestamp}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Users size={20} className="text-purple-600 dark:text-purple-400" />
                Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Active Users:</span>
                  <span className="font-semibold">{uniqueUsers.length}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Total Updates:</span>
                  <span className="font-semibold">{locations.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Clock size={20} className="text-purple-600 dark:text-purple-400" />
                Recent Updates
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {locations.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    Waiting for location updates...
                  </p>
                ) : (
                  locations.slice(0, 10).map((location) => (
                    <div
                      key={location.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 dark:text-white truncate">
                            {location.userName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatCoordinates(location.lat, location.lon)}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                          {location.timestamp}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div data-testid="statistics-section">
              <h2>Statistics</h2>
              <p>{locations.length}</p>
            </div>

            <div data-testid="recent-updates-section">
              <h2>Recent Updates</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {locations.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    Waiting for location updates...
                  </p>
                ) : (
                  locations.slice(0, 10).map((location) => (
                    <div
                      key={location.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 dark:text-white truncate">
                            {location.userName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatCoordinates(location.lat, location.lon)}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                          {location.timestamp}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};
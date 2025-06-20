import { useState, useEffect, useCallback, useRef } from 'react';
import { GeolocationPosition, GeolocationState, UseGeolocationReturn } from '../types/geolocationTypes';
import { GEOLOCATION_OPTIONS, WATCH_POSITION_OPTIONS, ERROR_MESSAGES } from '../constants/geolocationConstants';
import { createGeolocationPosition, getGeolocationError, checkGeolocationSupport } from '../utils/geolocationUtils';

export { GeolocationState };

export const useGeolocation = (): UseGeolocationReturn => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [state, setState] = useState<GeolocationState>(GeolocationState.Idle);
  const [error, setError] = useState<string | null>(null);
  const [isWatching, setIsWatching] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  const watchIdRef = useRef<number | null>(null);

  const handleSuccess = useCallback((pos: globalThis.GeolocationPosition) => {
    const newPosition = createGeolocationPosition(pos);
    setPosition(newPosition);
    setAccuracy(pos.coords.accuracy);
    setState(GeolocationState.Granted);
    setError(null);
  }, []);

  const handleError = useCallback((err: GeolocationPositionError) => {
    const { message, state: newState } = getGeolocationError(err);
    setError(message);
    setState(newState);
    console.error('Geolocation error:', message);
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!checkGeolocationSupport()) return false;

    setState(GeolocationState.Requesting);
    setError(null);

    try {
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'geolocation' });

        if (permission.state === 'denied') {
          setState(GeolocationState.Denied);
          setError('Location permission is denied. Please enable it in your browser settings.');
          return false;
        }

        if (permission.state === 'granted') {
          setState(GeolocationState.Granted);
          return true;
        }
      }

      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            handleSuccess(pos);
            resolve(true);
          },
          (err) => {
            handleError(err);
            resolve(false);
          },
          GEOLOCATION_OPTIONS
        );
      });
    } catch (error) {
      setState(GeolocationState.Denied);
      setError('Failed to request location permission');
      return false;
    }
  }, [checkGeolocationSupport, handleSuccess, handleError]);

  const getCurrentPosition = useCallback(async (): Promise<GeolocationPosition> => {
    if (!checkGeolocationSupport()) {
      throw new Error('Geolocation not supported');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos: globalThis.GeolocationPosition) => {
          const position: GeolocationPosition = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            timestamp: pos.timestamp
          };
          handleSuccess(pos);
          resolve(position);
        },
        (err) => {
          handleError(err);
          reject(new Error(error || 'Failed to get current position'));
        },
        GEOLOCATION_OPTIONS
      );
    });
  }, [checkGeolocationSupport, handleSuccess, handleError, error]);

  const startWatching = useCallback(async (): Promise<boolean> => {
    if (!checkGeolocationSupport()) return false;

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    if (state !== GeolocationState.Granted) {
      const hasPermission = await requestPermission();
      if (!hasPermission) return false;
    }

    try {
      const watchId = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        WATCH_POSITION_OPTIONS
      );

      watchIdRef.current = watchId;
      setIsWatching(true);
      return true;
    } catch (error) {
      setError(ERROR_MESSAGES.WATCH_FAILED);
      return false;
    }
  }, [checkGeolocationSupport, state, requestPermission, handleSuccess, handleError]);

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsWatching(false);
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return {
    position,
    state,
    error,
    isWatching,
    requestPermission,
    getCurrentPosition,
    startWatching,
    stopWatching,
    accuracy
  };
};
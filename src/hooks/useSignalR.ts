import { useEffect, useState, useCallback, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { ConnectionState, LocationData, UseSignalRReturn } from '../types/signalRTypes';
import { HUB_URL, ERROR_MESSAGES } from '../constants/signalRConstants';
import { createHubConnection, getFormattedError } from '../utils/signalRUtils';

export const useSignalR = (): UseSignalRReturn => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.Disconnected);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const locationCallbackRef = useRef<((data: LocationData) => void) | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isConnectingRef = useRef(false);

  const connect = useCallback(async () => {
    if (
      isConnectingRef.current ||
      connection?.state === signalR.HubConnectionState.Connected ||
      connection?.state === signalR.HubConnectionState.Connecting ||
      connection?.state === signalR.HubConnectionState.Reconnecting
    ) {
      return;
    }

    try {
      isConnectingRef.current = true;

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (connection) {
        await connection.stop();
      }

      setConnectionState(ConnectionState.Connecting);
      setConnectionError(null);

      const newConnection = createHubConnection(HUB_URL);

      // Configure connection options
      newConnection.serverTimeoutInMilliseconds = 60000; // 1 minute
      newConnection.keepAliveIntervalInMilliseconds = 30000; // 30 seconds

      newConnection.onclose((error) => {
        if (!error) return; // Ignore planned disconnections

        setConnectionState(ConnectionState.Disconnected);
        setConnectionError(`${ERROR_MESSAGES.CONNECTION_CLOSED}: ${error.message}`);

        if (!reconnectTimeoutRef.current) {
          reconnectTimeoutRef.current = setTimeout(() => {
            isConnectingRef.current = false;
            connect();
          }, 5000);
        }
      });

      newConnection.onreconnecting(() => {
        setConnectionState(ConnectionState.Reconnecting);
      });

      newConnection.onreconnected(() => {
        setConnectionState(ConnectionState.Connected);
        setConnectionError(null);
      });

      newConnection.on('ReceiveLatLon', (data: LocationData) => {
        if (locationCallbackRef.current) {
          locationCallbackRef.current(data);
        }
      });

      await newConnection.start();
      setConnection(newConnection);
      setConnectionState(ConnectionState.Connected);
      setConnectionError(null);
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionState(ConnectionState.Failed);
      setConnectionError(getFormattedError(error));

      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          isConnectingRef.current = false;
          connect();
        }, 5000);
      }
    } finally {
      isConnectingRef.current = false;
    }
  }, [connection]);

  const disconnect = useCallback(async () => {
    isConnectingRef.current = false;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (connection) {
      try {
        await connection.stop();
        setConnection(null);
        setConnectionState(ConnectionState.Disconnected);
        setConnectionError(null);
      } catch (error) {
        console.error('Error during disconnect:', error);
      }
    }
  }, [connection]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isConnectingRef.current = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (connection) {
        connection.stop().catch(console.error);
      }
    };
  }, [connection]);

  const sendLocation = useCallback(async (lat: number, lon: number, userName: string) => {
    if (connection?.state === signalR.HubConnectionState.Connected) {
      try {
        await connection.invoke('SendLatLon', lat, lon, userName);
      } catch (error) {
        console.error('Failed to send location:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to send location';
        setConnectionError(`Send failed: ${errorMessage}`);
      }
    } else {
      setConnectionError('Cannot send location: Not connected to server');
    }
  }, [connection]);

  const onLocationReceived = useCallback((callback: (data: LocationData) => void) => {
    locationCallbackRef.current = callback;
  }, []);

  return {
    connection,
    connectionState,
    connectionError,
    sendLocation,
    onLocationReceived,
    connect,
    disconnect
  };
};
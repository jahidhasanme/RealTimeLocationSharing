import * as signalR from '@microsoft/signalr';
import { CONNECTION_CONFIG, RETRY_POLICY, ERROR_MESSAGES } from '../constants/signalRConstants';

export const createHubConnection = (hubUrl: string): signalR.HubConnection => {
    return new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, CONNECTION_CONFIG)
        .withAutomaticReconnect({
            nextRetryDelayInMilliseconds: retryContext => {
                if (retryContext.previousRetryCount < RETRY_POLICY.maxRetries) {
                    return Math.random() * RETRY_POLICY.maxDelayMs;
                }
                return null;
            }
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();
};

export const getFormattedError = (error: unknown): string => {
    if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('failed to fetch') || errorMessage.includes('networkerror')) {
            return ERROR_MESSAGES.NETWORK;
        }
        if (errorMessage.includes('cors')) {
            return ERROR_MESSAGES.CORS;
        }
        return error.message;
    }
    return ERROR_MESSAGES.UNKNOWN;
};
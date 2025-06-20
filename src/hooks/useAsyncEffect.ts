import { useEffect } from 'react';

export const useAsyncEffect = (
    effect: () => Promise<void | (() => void | Promise<void>)>,
    deps?: React.DependencyList
) => {
    useEffect(() => {
        const execute = async () => {
            const cleanup = await effect();
            return cleanup;
        };

        const promise = execute();

        return () => {
            promise.then(cleanup => {
                if (cleanup) {
                    cleanup();
                }
            });
        };
    }, deps);
};
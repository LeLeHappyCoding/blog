/**
 * @Description: useEvent-保证callback的稳定
 * @Author: lele
 * @Date: 2025-08-30 20:54:20
 */
import {useCallback, useLayoutEffect, useRef} from 'react';

type Callback = (...args: any[]) => any;

const useEvent = (callback: Callback) => {
    const latestCallbackRef = useRef(callback);

    useLayoutEffect(() => {
        latestCallbackRef.current = callback;
    }, [callback]);

    const stableCallback = useCallback((...args: any) => {
        return latestCallbackRef.current(...args);
    }, []);

    return stableCallback;
};

export default useEvent;

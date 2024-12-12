import { useState, useEffect, useCallback } from 'react';
import { makeRequest } from '../service/request';

// Generic type for the response data
interface UseFetchResponse<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

// Generic hook with flexible type support
export function useFetch<T = any>(
    url: string,
    options?: {
        immediate?: boolean;
        method?: 'get' | 'post' | 'put' | 'delete';
        body?: any;
    }
): UseFetchResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const {
        immediate = true,
        method = 'get',
        body = undefined
    } = options || {};

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            let response;
            switch (method) {
                case 'get':
                    response = await makeRequest.get<T>(url);
                    break;
                case 'post':
                    response = await makeRequest.post<T>(url, body);
                    break;
                case 'put':
                    response = await makeRequest.put<T>(url, body);
                    break;
                case 'delete':
                    response = await makeRequest.delete<T>(url);
                    break;

                default:
                    throw new Error(`Unsupported method: ${method}`);
            }
            if (response)
                setData(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        } finally {
            setLoading(false);
        }
    }, [url, method, body]);

    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, [fetchData, immediate]);

    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
}
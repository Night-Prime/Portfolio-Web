import { useEffect, useState } from "react";

import { makeRequest } from "../service/request";

interface useFetchState<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
  refetch: () => void;
}

function useFetch<T = any>(
  url: string,
  options: Record<string, any> = { method: "GET" },
  pollingInterval?: number,
  debounceDelay: number = 300
): useFetchState<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (signal: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      const res = await makeRequest(url);
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`Error: ${res.statusText}`);
      }
      setData(res.data.data);
    } catch (err: any) {
      if (!signal.aborted) {
        console.error("Fetch error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "An unexpected error occurred."
        );
      }
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const handler = setTimeout(
      () => fetchData(controller.signal),
      debounceDelay
    );

    return () => {
      clearTimeout(handler);
      controller.abort();
    };
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (pollingInterval) {
      intervalId = setInterval(
        () => fetchData(new AbortController().signal),
        pollingInterval
      );
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [url, pollingInterval]);

  return {
    loading,
    data,
    error,
    refetch: () => fetchData(new AbortController().signal),
  };
}

// const useFetch = (url: string) => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await makeRequest.get(url);
//       if (res.status < 200 || res.status >= 300) {
//         throw new Error(`Error: ${res.statusText}`);
//       }
//       setData(res.data.data);
//     } catch (err: any) {
//       console.error("Fetch error:", err);
//       setError(err.msg || "An error occurred while fetching data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [url]);

//   return { loading, data, error, refetch: fetchData };
// };

export default useFetch;

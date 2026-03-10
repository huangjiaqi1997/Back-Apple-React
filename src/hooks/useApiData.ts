import { useState, useEffect } from "react";

const useApiData = <T>(apiUrl: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (signal: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl, { signal });
      if (!response.ok) {
        throw new Error("网络错误");
      }
      const result: T = await response.json();
      console.log("加载数据:", result);
      setData(result);
    } catch (error) {
      console.error("加载数据失败:", error);
      setError(error instanceof Error ? error.message : "加载数据失败");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => {
      controller.abort(); // 清理函数，取消未完成的请求
      console.log("useEffect 清理");
    };
  }, [apiUrl]);

  return {
    data,
    loading,
    error,
  };
};

export default useApiData;

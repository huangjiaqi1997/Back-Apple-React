import { useState, useEffect } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    // 从 localStorage 中加载数据，如果没有则使用初始值
    const savedValue = localStorage.getItem(key);
    return savedValue ? (JSON.parse(savedValue) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
  //   return {value, setValue} as const;
};

export default useLocalStorage;

//const [count, setCount] = useLocalStorage<number>(0, "count");
/*
const [user, setUser] = 
    useLocalStorage<{ name: string; age: number }>(
        { name: "张三", age: 25 }, 
        "user"
    );
*/

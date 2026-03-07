import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "@/types/custom";
import { useDebounce } from "@/helpers/useDebounce";
import Button from "@/components/Button";

const SearchResults = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const debouncedQuery = useDebounce(query, 500); // 使用自定义的防抖钩子

  const page = parseInt(searchParams.get("page") || "1"); // 获取页码，默认为1

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query: query || "", page: newPage.toString() });
  };

  const [searchResults, setSearchResults] = useState<Product[]>([]); // 假设这是从API获取的搜索结果

  const search = async (signal: AbortSignal) => {
    try {
      const response = await fetch(
        `http://localhost:5293/api/products?keyword=${debouncedQuery}`,
        {
          signal,
        }
      );
      if (!response.ok) {
        throw new Error("网络响应不是OK");
      }
      // 检查响应状态码是否为200
      const data = await response.json();
      console.log("Fetched data:", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]); // 出错时清空结果
    }
  };

  useEffect(() => {
    // 副作用逻辑
    const constroller = new AbortController();
    // 创建一个新的AbortController实例，用于取消请求
    const signal = constroller.signal;
    search(signal); // 调用搜索函数
    return () => {
      // 清理函数
      console.log("清理函数执行，取消请求");
      constroller.abort(); // 取消请求
    };
  }, [debouncedQuery]); // 依赖数组
  // 空数组 []：只在组件挂载（mount）时执行一次。
  // 有依赖：依赖变化时重新执行。
  // 不写依赖：每次渲染都会执行（不推荐，容易浪费性能）。

  useEffect(() => {
    console.log("我只行了！！！！");
    let timer = setInterval(() => {
      console.log("每隔一秒执行一次的逻辑");
    }, 1000);

    return () => {
      // 清理函数
      console.log("组件卸载时执行的清理逻辑");
      clearInterval(timer); // 清除定时器
      console.log("定时器已清除");
    };
  }, [query]); // 只在组件挂载时执行一次

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto mb-12">
        <input
          type="text"
          value={query ?? ""}
          onChange={(e) => {
            setSearchParams({ query: e.target.value, page: page.toString() });
          }}
          placeholder="输入搜索关键词"
          className="w-full px-6 py-4 bg-apple-white dark:bg-apple-dark rounded-xl text-lg
            border border-apple-gray dark:border-apple-dark-gray
            focus:outline-none focus:ring-1 focus:ring-apple-blue dark:focus:ring-apple
            transition-all
          "
        />
        <p className="mt-6">搜索关键词：{query}</p>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {searchResults.map((product) => (
          <div
            key={product.id}
            className="bg-apple-gray-100 dark:bg-apple-gray-900 dark:border-apple-gray-500
              rounded-2xl shadow-sm p-6
              hover:transform hover:scale-105 transition-all duration-300
            "
          >
            <div className="aspect-square object-contain rounded-xl">
              <img
                className="w-full h-full object-contain rounded-xl"
                src={product.image}
                alt={product.image}
              />
            </div>
            <h3 className="text-2xl font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-400 mb-4">{product.title}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-medium">
                {product.startingPrice}
              </span>
              <div className="flex gap-3">
                <Button title="立刻购买" />
                <Button
                  title="了解更多"
                  variant="outline"
                  onClick={() => navigate(`/product-detail/${product.id}`)}
                />
              </div>
            </div>
            {!product.inStock && (
              <div className="mt-4 text-red-400">暂时缺货</div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-8 gap-6">
        <h2 className="text-xl font-medium text-apple-text dark:text-apple-text-dark">
          当前第 <span className="font-semibold">{page}</span> 页
        </h2>
        <Button
          title="上一页"
          onClick={() => handlePageChange(page - 1)}
        ></Button>
        <Button
          title="下一页"
          onClick={() => handlePageChange(page + 1)}
        ></Button>
      </div>
    </div>
  );
};

export default SearchResults;

import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { CartItem, Product } from "@/types/custom";
import { useDebounce } from "@/helpers/useDebounce";
import Button from "@/components/Button";
import SearchResultCard from "@/components/SearchResultCard";
import { ShoppingCartContext } from "../contexts/shoppingCart";
import FilterButton from "@/components/FilterButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState, StoreDispatch } from "../redux/store";
import { fetchSearchResults } from "../redux/searchSlice";

const filters = ["全部", "电脑", "手机", "平板", "其他"];

const SearchResults = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const debouncedQuery = useDebounce(query, 500); // 使用自定义的防抖钩子

  const page = parseInt(searchParams.get("page") || "1"); // 获取页码，默认为1

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query: query || "", page: newPage.toString() });
  };

  const {
    items: searchResults,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    if (!debouncedQuery) {
      return;
    }
    const thunkPromise = dispatch(
      fetchSearchResults({ keyword: debouncedQuery })
    );

    return () => {
      // 组件卸载或关键词变化时取消未完成的请求
      thunkPromise.abort();
    };
  }, [debouncedQuery, dispatch]); // 依赖数组
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

  const { addToCart } = useContext(ShoppingCartContext);

  const handleAddToCart = useCallback((product: Product) => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      imageSrc: product.image,
      modelId: product.models[0].id,
      model: product.models[0].name,
      modelPrice: product.models[0].price,
      memorySizeId: product.memorySizes[0].id,
      memorySize: product.memorySizes[0].name,
      memorySizePrice: product.memorySizes[0].price,
      color: product.colors[0],
      price:
        product.startingPrice +
        product.models[0].price +
        product.memorySizes[0].price,
      qty: 1,
    };

    addToCart(cartItem);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("全部");

  const filteredProducts = useMemo(() => {
    return searchResults.filter((product) => {
      const matchesCategory =
        selectedCategory === "全部" || product.category === selectedCategory;
      console.log("过滤后的产品：", product);
      return matchesCategory;
    });
  }, [selectedCategory, searchResults]);

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
      {error && (
        <div className="max-w-4xl mx-auto mb-6">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}
      {error == null && (
        <div className="max-w-4xl mx-auto mb-6">
          <p className="text-lg">
            找到{" "}
            <span className="font-semibold">{filteredProducts.length}</span>{" "}
            个与“{debouncedQuery}”相关的产品
          </p>
        </div>
      )}
      <div className="max-w-4xl mx-auto mb-8 flex gap-4">
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            filter={filter}
            isSelected={filter == selectedCategory}
            onClick={() => {
              setSelectedCategory(filter);
            }}
          />
        ))}
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProducts.map((product) => (
          <SearchResultCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
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

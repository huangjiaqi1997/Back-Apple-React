import { useParams, useLoaderData } from "react-router-dom";
import { product_list } from "../assets/data/products";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types/custom";

type ParamsType = {
  id: string;
};

const PordcutDetail = () => {
  const navigate = useNavigate();
  const product = useLoaderData<Product>();
  if (!product) {
    // return <div>Product not found</div>;
    // 可以使用一个更友好的错误处理方式，比如重定向到404页面
    navigate("/404", { replace: true });
    return; // 这里返回 undefined 或者 null，避免渲染错误
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <p>This is the product detail page.</p>
      <p>{JSON.stringify(product.features)}</p>
    </div>
  );
};
export default PordcutDetail;

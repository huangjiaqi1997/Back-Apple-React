import SkuSelect from "./SkuSelect";
import { useState } from "react";
import { produce } from "immer";
import { Product, CartItem } from "@/types/custom";
import { object } from "framer-motion/client";

const updateItem = (updates: Partial<CartItem>) => {
  return produce((draft) => {
    // for (const key in updates) {
    //   (draft as any)[key] = updates[key as keyof CartItem];
    // }
    Object.assign(draft, updates);
  });
};

// updateItem({
//   model: "Pro Max",
//   modelPrice: 8999
// });

type ProductHeroProps = {
  product: Product;
  imageUrl: string;
};

function ProductHero({ product, imageUrl }: ProductHeroProps) {
  const [cartItem, setCartItem] = useState<CartItem>({
    productId: product.id,
    name: product.name,
    imageSrc: product.image,
    modelId: null,
    modelPrice: null,
    model: null,
    color: null,
    memorySize: null,
    memorySizeId: null,
    memorySizePrice: null,
    qty: 1,
  });

  return (
    <div
      className="flex flex-col lg:flex-row-reverse
        pt-8 mt-4 
        md:pt-28 lg:pt-52
        space-y-4
        text-apple-text-light dark:text-apple-text-dark
    "
    >
      <div className="flex-1 flex justify-center items-center">
        <img src={imageUrl} className="w-[350px] lg:-mt-32 lg:ml-19" />
      </div>
      <div className="flex-1 space-y-6 ml-6 md:ml-24">
        <div className="text-4xl font-black md:text-6xl">
          购买 {product.name}
        </div>
        <div className="font-medium md:text-xl">
          RMB {Number(product.startingPrice).toLocaleString("en-US")}
        </div>
        <div className="flex space-x-3">
          <SkuSelect
            placeholder={"型号"}
            options={product.models.map((model) => model.name)}
            onChange={(value) => {
              const selectedModel = product.models.find(
                (model) => model.name === value
              );
              if (selectedModel)
                setCartItem(
                  updateItem({
                    model: selectedModel.name,
                    modelId: selectedModel.id,
                    modelPrice: selectedModel.price,
                  })
                );
              console.log(cartItem);
            }}
            value={cartItem.model}
          />
          <SkuSelect
            placeholder={"颜色"}
            options={product.colors}
            onChange={(value) => {
              setCartItem(updateItem({ color: value as string })); // 确保类型安全
            }}
            value={cartItem.color}
          />
          <SkuSelect
            placeholder={"储存容量"}
            options={product.memorySizes.map((size) => size.name)}
            onChange={(value) => {
              const selectedMemorySize = product.memorySizes.find(
                (size) => size.name === value
              );
              if (selectedMemorySize)
                setCartItem(
                  updateItem({
                    memorySize: selectedMemorySize.name,
                    memorySizeId: selectedMemorySize.id,
                    memorySizePrice: selectedMemorySize.price,
                  })
                );
            }}
            value={cartItem.memorySize}
          />
          <button
            className="
            border border-apple-blue
            px-5 py-2 bg-transparent
            rounded-md
            hover:bg-apple-blue
            hover:text-apple-gray-100
          "
            onClick={() => {
              alert("加入购物车: " + JSON.stringify(cartItem));
            }}
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductHero;

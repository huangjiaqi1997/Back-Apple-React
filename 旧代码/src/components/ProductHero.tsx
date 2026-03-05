import { useState } from 'react'
import SkuSelect from './SkuSelect'
import { produce } from 'immer'
import { Product, CartItem } from '#types/custom'

const updateItem = (updates: Partial<CartItem>) =>
  produce(draft => {
    Object.assign(draft, updates)
  })

const ProductHero = ({ product }: { product: Product }) => {
  const [cartItem, setCartItem] = useState<CartItem>({
    id: product.id,
    productId: product.id,
    name: product.name,
    image: product.image,
    model: null,
    modelId: null,
    modelPrice: null,
    color: null,
    memorySize: null,
    memorySizeId: null,
    memorySizePrice: null,
    qty: 1,
  })

  const handleModelChange = (value: string) => {
    const model = product.models.find(m => m.name === value)
    model && setCartItem(updateItem({
      model: model?.name,
      modelId: model?.id,
      modelPrice: model?.price
    }))
  }

  const handleMemoryChange = (value: string) => {
    const memorySize = product.memorySizes.find(m => m.name === value)
    memorySize && setCartItem(
      updateItem({
        memorySize: memorySize?.name,
        memorySizeId: memorySize?.id,
        memorySizePrice: memorySize?.price,
      })
    )
  }

  const handleCartClick = () => console.log('console: add cart', cartItem)
  return (
    <div
      className="flex flex-col gap-4 p-4 mb-4
      md:flex-row-reverse md:justify-between md:items-end
      md:w-[80%] md:max-w-8xl md:mx-auto
      dark:bg-apple-dark dark:text-apple-light
      ">
      <div>
        <img
          className="h-[320px] w-full object-contain md:w-auto"
          src={product.image}
        />
      </div>
      <div className="space-y-4 md:mb-4">
        <h2 className="text-4xl md:text-6xl font-bold">购买 {product.name}</h2>
        <div className="font-semibold">
          RMB {Number(product.startingPrice).toLocaleString('en-US')}
        </div>
        <div className="flex gap-3">
          <SkuSelect
            placeholder="型号"
            options={product.models.map(model => model.name)}
            value={cartItem.model}
            onChange={value => handleModelChange(value)}
          />
          <SkuSelect
            placeholder="颜色"
            options={product.colors}
            value={cartItem.color}
            onChange={val => setCartItem(updateItem({color: val as string}))}
          />
          <SkuSelect
            placeholder="内存"
            options={product.memorySizes.map(memo => memo.name)}
            value={cartItem.memorySize}
            onChange={value => handleMemoryChange(value)}
          />
          <button
            className="px-3 py-2
            border border-apple-blue rounded-md
            flex items-center gap-3
            hover:bg-apple-blue hover:text-apple-light
            transition cursor-pointer"
            onClick={handleCartClick}>
            加入购物车
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductHero

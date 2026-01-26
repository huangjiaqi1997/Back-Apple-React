import { useState } from 'react'
import SkuSelect from './SkuSelect'
import { produce } from 'immer'

const updateItem = (key, value) =>
  produce(draft => {
    draft[key] = value
  })

const ProductHero = ({ product }) => {
  const [cartItem, setCartItem] = useState({
    id: product.id,
    image: product.image,
    model: null,
    color: null,
    memorySize: null,
  })

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
            onChange={e => setCartItem(updateItem('model', e.target.value))}
          />
          <SkuSelect
            placeholder="颜色"
            options={product.colors}
            value={cartItem.color}
            onChange={e => setCartItem(updateItem('color', e.target.value))}
          />
          <SkuSelect
            placeholder="内存"
            options={product.memorySizes.map(memo => memo.name)}
            value={cartItem.memorySize}
            onChange={e =>
              setCartItem(updateItem('memorySize', e.target.value))
            }
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
